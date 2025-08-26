import React, { useState, useEffect, useRef } from 'react';
import Explanations from '../../genericComponent/Explanations';
import { useLocation } from 'react-router-dom';
import './styles/PartOne.css';
import NavigationButtons from '../../genericComponent/NavigationButtons';


import Note1 from './Notes/Note1';
import Note2 from './Notes/Note2';
import Note3 from './Notes/Note3';
import Note4 from './Notes/Note4';
import Note5 from './Notes/Note5';
import Note6 from './Notes/Note6';

const PartOne = ({ setHideNavBar }) => {
  const location = useLocation();
  const reviewMode = location.state?.reviewMode || false;

  const timerRef = useRef(null);
  const chapterName = "PartOne";

  const started = sessionStorage.getItem("partOneStarted") === "true";
  const finished = sessionStorage.getItem("partOneFinished") === "true";
  const endShown = sessionStorage.getItem("partOneEndShown") === "true";

  const [explanationStage, setExplanationStage] = useState(() => {
    if (finished && endShown) return null;
    if (!started) return "start";
    return null;
  });

  const [activeNoteId, setActiveNoteId] = useState(null);
  const [viewedNoteIds, setViewedNoteIds] = useState(() => {
    const saved = sessionStorage.getItem('viewedNoteIds');
    return saved ? JSON.parse(saved) : [];
  });
  const [isZoomedCorkboard, setIsZoomedCorkboard] = useState(false);
  const [showNotes, setShowNotes] = useState(true);
  const [showAboveBox, setShowAboveBox] = useState(false);
  const [notesFadeIn, setNotesFadeIn] = useState(false);
  const [showNoteContent, setShowNoteContent] = useState(false);

  const notes = [
    { id: 1, text: 'ייעוד פקע"ר' },
    { id: 2, text: 'סד"כ פקע"ר' },
    { id: 3, text: 'סד"כ פקע"ר רפואה' },
    { id: 4, text: "התפיסה המבצעית" },
    { id: 5, text: 'מחוזות פקע"ר' },
    { id: 6, text: "מבנה הפיקוד" },
  ];

  const allNoteIds = notes.map(note => note.id);

  const closeNoteAndReturn = () => {
    setActiveNoteId(null);
    setIsZoomedCorkboard(false);
    setShowAboveBox(false);
    setShowNoteContent(false);

    setTimeout(() => {
      setShowNotes(true);
    }, 600);

    const allViewed = allNoteIds.every(id => viewedNoteIds.includes(id));

    if (allViewed && !finished && !endShown) {
      timerRef.current = setTimeout(() => {
        sessionStorage.setItem("partOneFinished", "true");
        sessionStorage.setItem("partOneEndShown", "true");
        setExplanationStage("end");
      }, 1000);
    }
  };

  const noteComponents = {
    1: <Note1 onClose={closeNoteAndReturn} />,
    2: <Note2 onClose={closeNoteAndReturn} />,
    3: <Note3 onClose={closeNoteAndReturn} />,
    4: <Note4 onClose={closeNoteAndReturn} />,
    5: <Note5 onClose={closeNoteAndReturn} />,
    6: <Note6 onClose={closeNoteAndReturn} />,
  };

  const handleNoteClick = (id) => {
    setActiveNoteId(id);
    setIsZoomedCorkboard(true);
    setShowNotes(false);
    setShowAboveBox(false);
    setShowNoteContent(false);

    setTimeout(() => {
      setShowAboveBox(true);
    }, 600);

    setTimeout(() => {
      setShowNoteContent(true);
    }, 1000);

    if (!started) {
      sessionStorage.setItem("partOneStarted", "true");
      setExplanationStage(null);
    }

    setViewedNoteIds((prev) => {
      if (!prev.includes(id)) {
        const updated = [...prev, id];
        sessionStorage.setItem('viewedNoteIds', JSON.stringify(updated));
        return updated;
      }
      return prev;
    });
  };

  useEffect(() => {
    if (!setHideNavBar) return;

    if (activeNoteId !== null) {
      setHideNavBar(true);  // בתוך פתקים - הסתר נאב בר
    } else {
      setHideNavBar(false); // מחוץ לפתקים - החזר נאב בר
    }
  }, [activeNoteId, setHideNavBar]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (showNotes) {
      setNotesFadeIn(false);
      const timeoutId = setTimeout(() => {
        setNotesFadeIn(true);
      }, 10);
      return () => clearTimeout(timeoutId);
    } else {
      setNotesFadeIn(false);
    }
  }, [showNotes]);

  return (
    <div className="PartOne">
      {explanationStage && (
        <Explanations
          chapterName={chapterName}
          position={explanationStage}
          onClose={() => setExplanationStage(null)}
        />
      )}

      {isZoomedCorkboard && <div className="blur-overlay active" />}

      <>
        {activeNoteId === null && !explanationStage && (
          <img
            src={`${process.env.PUBLIC_URL}/Assets/PartOneImgs/ThomerPointing.png`}
            alt="Tomer"
            className={`Tomer-one ${notesFadeIn ? 'fade-in-one' : ''}`}
          />
        )}

        <img
          src={`${process.env.PUBLIC_URL}/Assets/PartOneImgs/corkboard.png`}
          alt="corkboard"
          className={`corkboard ${isZoomedCorkboard ? 'zoomed' : ''}`}
        />

        {isZoomedCorkboard && showAboveBox && (
          <div className="above-corkboard-box" />
        )}

        {activeNoteId === null && showNotes && notes.map(({ id, text }) => (
          <div className='contanier-notes' key={id}>
            <div
              className={`note-wrapper ${notesFadeIn ? 'fade-in-one' : ''} ${viewedNoteIds.includes(id) ? 'grayscale' : ''}`}
              id={`note${id}`}
              onClick={() => handleNoteClick(id)}
            >
              <img
                src={`${process.env.PUBLIC_URL}/Assets/PartOneImgs/Notes/note${id}/note${id}.png`}
                alt={`note${id}`}
                className="notes"
              />
              <div className="note-text">{text}</div>
            </div>
          </div>
        ))}

        {activeNoteId && showNoteContent && (
          <div className="note-expanded">
            {noteComponents[activeNoteId]}
          </div>
        )}

        <NavigationButtons endShownKey="partOneEndShown" />

      </>
    </div>
  );
};

export default PartOne;
