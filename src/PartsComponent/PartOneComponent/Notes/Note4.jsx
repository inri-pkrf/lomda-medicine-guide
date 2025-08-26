import React, { useState } from 'react';
import '../styles/Note4.css';

const Note4 = ({ onClose }) => {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState("right");

  const steps = [
    {
      title: "התפיסה המבצעית",
      content: (
        <img
          src={`${process.env.PUBLIC_URL}/Assets/PartOneImgs/Notes/note4/Mivzait.png`}
          alt="Mivzait"
          className="Mivzait"
        />
      )
    },
    {
      title: "התפיסה המבצעית - המענה המבצעי",
      content: (
        <img
          src={`${process.env.PUBLIC_URL}/Assets/PartOneImgs/Notes/note4/maaneMivzaim.png`}
          alt="maaneMivzaim"
          className="Mivzait"
        />
      )
    },
    {
      title: "התפיסה המבצעית - המענה המבצעי",
      content: (
        <img
          src={`${process.env.PUBLIC_URL}/Assets/PartOneImgs/Notes/note4/maaneMivzaim2.png`}
          alt="maaneMivzaim"
          className="maaneMivzaim"
        />
      )
    },
    {
      title: "התפיסה המבצעית - המענה המשפטי",
      content: (
        <img
          src={`${process.env.PUBLIC_URL}/Assets/PartOneImgs/Notes/note4/MaaneMishpati.png`}
          alt="MaaneMishpati"
          className="maaneMishpati"
        />
      )
    },
    {
      title: "התפיסה המבצעית - משמעות האיום והמענה על העורף",
      content: (
        <img
          src={`${process.env.PUBLIC_URL}/Assets/PartOneImgs/Notes/note4/BadOref.png`}
          alt="BadOref"
          className="Mivzait"
        />
      )
    }
  ];

  const totalSteps = steps.length;

  return (
    <div className="Note4">
      <img
        src={`${process.env.PUBLIC_URL}/Assets/PartOneImgs/Notes/note4/tape4.png`}
        alt="tape4"
        className="tapes"
        id="tape4-one"
      />
      <img
        src={`${process.env.PUBLIC_URL}/Assets/PartOneImgs/Notes/note4/tape4.png`}
        alt="tape4"
        className="tapes"
        id="tape4-two"
      />

      {/* כותרת עם אנימציה */}
      <div
        key={`title-${step}`}
        className={`title-notes ${
          direction === "right" ? "fade-note4-right" : "fade-note4-left"
        }`}
      >
        {steps[step].title}
      </div>

      {/* תוכן עם אנימציה */}
      <div
        key={`content-${step}`}
        className={`note4-content ${
          direction === "right" ? "fade-note4-right" : "fade-note4-left"
        }`}
      >
        {steps[step].content}
      </div>

      <div className="buttons-bar">
        <div
          className="btn-text btn-text-prev"
          style={{ visibility: step > 0 ? 'visible' : 'hidden' }}
          onClick={() => {
            setDirection("left");
            setStep(prev => Math.max(prev - 1, 0));
          }}
        >
          <div className="img-arrow" />
          <div className="text-label">הקודם</div>
        </div>

        {step < totalSteps - 1 ? (
          <div
            className="btn-text btn-text-next"
            onClick={() => {
              setDirection("right");
              setStep(prev => Math.min(prev + 1, totalSteps - 1));
            }}
          >
            <div className="img-arrow" />
            <div className="text-label">הבא</div>
          </div>
        ) : (
          <div className="btn-text btn-text-end" onClick={onClose}>
            <div className="img-arrow" />
            <div className="text-label">סיום</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Note4;
