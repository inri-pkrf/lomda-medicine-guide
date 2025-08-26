import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../genericComponent/styles/NavBar.css';

const steps = [
  { id: 1, title: 'מבוא', path: '/part-one', isQuestion: false },
  { id: 2, title: 'מבנה מפקדות', path: '/part-two', isQuestion: false },
  { id: 3, title: 'שאלה', path: '/questions/TWO', isQuestion: true },
  { id: 4, title: 'פלר"ג', path: '/part-three', isQuestion: false },
  { id: 5, title: 'שאלה', path: '/questions/THREE', isQuestion: true },
  { id: 6, title: 'יחסי גומלין', path: '/part-four', isQuestion: false },
  { id: 7, title: 'שאלה', path: '/questions/FOUR', isQuestion: true },
  { id: 8, title: 'סימולציה', path: '/simulation', isQuestion: false },
];

const NavBar = ({ hideNavBar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentStepIndex = steps.findIndex(step => step.path === location.pathname);
  const [completedSteps, setCompletedSteps] = useState(() => {
    try {
      const saved = sessionStorage.getItem('completedSteps');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (currentStepIndex !== -1) {
      const stepId = steps[currentStepIndex].id;
      if (!completedSteps.includes(stepId)) {
        const newCompleted = [...completedSteps, stepId];
        setCompletedSteps(newCompleted);
        sessionStorage.setItem('completedSteps', JSON.stringify(newCompleted));
      }
    }
  }, [currentStepIndex]);

  const onClickStep = (index) => {
    if (index <= currentStepIndex || completedSteps.includes(steps[index].id)) {
      navigate(steps[index].path, { state: { reviewMode: true } });
    }
  };

  if (location.pathname === '/' || location.pathname === '/part-zero') {
    return null;
  }

  return (
    <div className={`NavBar ${hideNavBar ? 'hidden' : ''}`}>
      <div className="timeline">
        <div className="background-line"></div>
        {steps.map((step, index) => {
          const isActive = completedSteps.includes(step.id);
          const isCurrent = currentStepIndex === index;
          const isLocked = !isActive && index > currentStepIndex;

          return (
            <div
              key={step.id}
              className={`step ${isCurrent ? 'current' : ''} ${isActive ? 'active' : ''} ${isLocked ? 'locked' : ''}`}
              onClick={() => !isLocked && onClickStep(index)}
              style={{ cursor: isLocked ? 'not-allowed' : 'pointer' }}
              title={isLocked ? 'לא ניתן לעבור לשלב זה עדיין' : ''}
            >
              <div className={`circle ${step.isQuestion ? 'question' : ''} ${isCurrent ? 'current' : ''} ${isActive ? 'active' : ''}`}>
                {step.isQuestion ? '?' : ''}
              </div>
              <div className={`label ${step.isQuestion ? 'empty' : ''}`}>
                {!step.isQuestion ? step.title : ''}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NavBar;
