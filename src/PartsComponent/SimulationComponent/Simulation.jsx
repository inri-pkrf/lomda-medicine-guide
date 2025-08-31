import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import simulationData from '../../Data/simulationData';
import './Simulation.css';
import NavigationButtons from '../../genericComponent/NavigationButtons';

const Simulation = ({ onFinishSimulation }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const chatRef = useRef(null);
  const messagesEndRef = useRef(null);

  // --- STATE ---
  const [showIntroScreen, setShowIntroScreen] = useState(() => {
    const started = sessionStorage.getItem('simulationStarted');
    return started !== 'true' || location.state?.fromEndPage;
  });

  const [selectedSimulation, setSelectedSimulation] = useState(() => {
    const saved = sessionStorage.getItem('selectedSimulation');
    return saved !== null ? parseInt(saved, 10) : null;
  });

  const [simulationStarted, setSimulationStarted] = useState(() => {
    return sessionStorage.getItem('simulationStarted') === 'true';
  });

  const [currentIndex, setCurrentIndex] = useState(() => {
    const savedProgress = JSON.parse(sessionStorage.getItem('simulationProgress')) || {};
    return selectedSimulation !== null && savedProgress[selectedSimulation] !== undefined
      ? savedProgress[selectedSimulation]
      : 0;
  });

  const [expandedMessage, setExpandedMessage] = useState(null);
  const [showEndButton, setShowEndButton] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // --- ref לזכור אילו הודעות כבר נפתחו במודאל לכל סימולציה ---
  const openedMessagesRef = useRef({});

  // --- CURRENT SIMULATION DATA ---
  const currentSimulation =
    selectedSimulation !== null ? simulationData[selectedSimulation] : simulationData[0];

  const filteredMessages = currentSimulation.messages;
  const messagesToShow = filteredMessages.slice(0, currentIndex + 1);
  const nextMessage = filteredMessages[currentIndex + 1];

  // --- EFFECTS ---
  // גלילה לסוף הצ'אט
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentIndex, showIntroScreen]);

  // שמירת התקדמות בסשן לפי סימולציה
  useEffect(() => {
    if (selectedSimulation === null) return;
    const progress = JSON.parse(sessionStorage.getItem('simulationProgress')) || {};
    progress[selectedSimulation] = currentIndex;
    sessionStorage.setItem('simulationProgress', JSON.stringify(progress));
  }, [currentIndex, selectedSimulation]);

  // פתיחת הודעה ראשונה אוטומטית לפי סימולציה נבחרת
  useEffect(() => {
    if (selectedSimulation === null) return;

    const sim = simulationData[selectedSimulation];
    const savedProgress = JSON.parse(sessionStorage.getItem('simulationProgress')) || {};
    const startIndex = savedProgress[selectedSimulation] || 0;

    const alreadyOpened = openedMessagesRef.current[selectedSimulation]?.includes(startIndex);
    if (!alreadyOpened) {
      setExpandedMessage(sim.messages[startIndex]);
      openedMessagesRef.current[selectedSimulation] = [
        ...(openedMessagesRef.current[selectedSimulation] || []),
        startIndex
      ];
    }

    setCurrentIndex(startIndex);
  }, [selectedSimulation]);

  // הצגת כפתור סיום
  useEffect(() => {
    if (!showIntroScreen) setShowEndButton(true);
  }, [showIntroScreen]);

  // --- HANDLERS ---
  const handleBackToSelection = () => {
    setShowIntroScreen(true);
  };

  const handleSelectSimulation = idx => {
    setSelectedSimulation(idx);
    const savedProgress = JSON.parse(sessionStorage.getItem('simulationProgress')) || {};
    setCurrentIndex(savedProgress[idx] || 0);
    setSimulationStarted(false);
    setErrorMessage('');
  };

  const handleStartSimulation = () => {
    if (selectedSimulation !== null) {
      sessionStorage.setItem('selectedSimulation', selectedSimulation);
      sessionStorage.setItem('simulationStarted', 'true');
      setShowIntroScreen(false);
      setSimulationStarted(true);
      setErrorMessage('');
    } else {
      setErrorMessage('אנא בחרו סימולציה לפני ההתחלה');
    }
  };

  const handleNext = () => {
    const sim = currentSimulation;

    if (currentIndex < sim.messages.length - 1) {
      const newIndex = currentIndex + 1;

      // אם ההודעה הבאה עוד לא נפתחה במודאל
      const alreadyOpened = openedMessagesRef.current[selectedSimulation]?.includes(newIndex);
      if (!alreadyOpened) {
        setExpandedMessage(sim.messages[newIndex]);
        openedMessagesRef.current[selectedSimulation] = [
          ...(openedMessagesRef.current[selectedSimulation] || []),
          newIndex
        ];
      }

      setCurrentIndex(newIndex);
    } else {
      setExpandedMessage(null);

      const doneSimulations = JSON.parse(sessionStorage.getItem('doneSimulations')) || [];
      if (!doneSimulations.includes(selectedSimulation)) {
        doneSimulations.push(selectedSimulation);
        sessionStorage.setItem('doneSimulations', JSON.stringify(doneSimulations));
      }

      onFinishSimulation();
    }
  };

  const closeExpanded = () => {
    setExpandedMessage(null);
  };

  // --- JSX ---
  if (showIntroScreen) {
    return (
      <div className="simulation-fullscreen intro-screen">
        <div className="simulation-intro-text">
          <h2>סיימתם את שלבי הלמידה 🎉</h2>
          <p>בחרו סימולציה למטה ולחצו על התחלה</p>
        </div>

        <img
          src={`${process.env.PUBLIC_URL}/Assets/Simulation/TomerSImulation.png`}
          alt="Tomer"
          className='TomerPhone-sim'
        />

        <div className="simulation-selection-grid">
          {simulationData.map((sim, idx) => {
            const doneSimulations = JSON.parse(sessionStorage.getItem('doneSimulations')) || [];
            const completed = doneSimulations.includes(idx);

            return (
              <div
                key={idx}
                className={`simulation-card ${selectedSimulation === idx ? 'selected' : ''} ${completed ? 'completed' : ''}`}
                onClick={() => handleSelectSimulation(idx)}
              >
                {sim.name}
              </div>
            );
          })}
        </div>

        {errorMessage && (
          <div className="simulation-error-message">
            {errorMessage}
          </div>
        )}

        <button className="start-simulation-button" onClick={handleStartSimulation}>
          התחלה
        </button>
      </div>
    );
  }

  return (
    <div className="simulation-fullscreen">
      <button
        className="back-to-selection-button"
        onClick={handleBackToSelection}
      >
        חזרה לבחירת סימולציה →
      </button>

      <div className="simulation-title">{currentSimulation.name}</div>

      <div className="chat-window" ref={chatRef}>
        {messagesToShow.map((msg, idx) => (
          <div
            key={idx}
            className={`chat-message ${msg.side === 1 ? 'right' : 'left'} fade-in`}
          >
            <div className="chat-bubble">
              <p>{msg.content}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-footer">
        {!nextMessage ? (
          <button
            className="next-button"
            onClick={handleNext}
          >
            סיים סימולציה
          </button>
        ) : (
          <button className="next-button" onClick={handleNext}>
            {nextMessage ? 'המשך' : 'סיום'}
          </button>
        )}
      </div>

      {expandedMessage && (
        <div className="expanded-overlay"  onClick={closeExpanded}>
          <div className="expanded-box">
            <button className="close-btn" onClick={closeExpanded}>✖</button>
            <div className="expanded-text">{expandedMessage.content}</div>
          </div>
        </div>
      )}

      <NavigationButtons showNext={!showIntroScreen} allowNext={true} simulationStarted={showEndButton} />
    </div>
  );
};

export default Simulation;
