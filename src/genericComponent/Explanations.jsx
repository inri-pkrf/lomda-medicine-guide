import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Explanations.css';
import explanationsData from '../Data/ExplanationsData/ExplanationsData';


const Explanations = ({ position, chapterName, onClose }) => {
  const content = explanationsData[chapterName]?.[position];
  const tomerImg = explanationsData[chapterName]?.TomerImg;
  const nextPart = explanationsData[chapterName]?.end?.nextPart;
  const navigate = useNavigate();


  const [isClosing, setIsClosing] = useState(false);


  const handleClose = () => {
    setIsClosing(true);
  };


  useEffect(() => {
    if (isClosing) {
      const timer = setTimeout(() => {
        onClose();
        if (position === 'end' && nextPart) {
          if (chapterName === 'PartOne') {
            navigate(nextPart);
          } else {
            navigate(`/questions/${nextPart}`);
          }
        }
      }, 400); // זמן תואם לאנימציה
      return () => clearTimeout(timer);
    }
  }, [isClosing]);


  if (!content) return null;


  const animationClass = isClosing ? 'fade-outExplanations' : 'fade-inExplanations';


  const bubbleClass = `speech-bubble speech-bubble${chapterName} speech-bubble-${chapterName}-${position} ${animationClass}`;
  const tomerClass = `tomer-img tomer${chapterName} tomer-${chapterName}-${position} ${animationClass}`;


  return (
    <div id="Explanations">
      {tomerImg && (
        <img
          src={tomerImg}
          alt="תומר"
          className={tomerClass}
        />
      )}
      <div className={bubbleClass}>
        <img
          className='close-btn-bubble'
          onClick={handleClose}
          src={`${process.env.PUBLIC_URL}/Assets/Btns/closeBlack.png`}
        />
        <p style={{ paddingTop: '1vh' }}>
          {content.text}
        </p>
      </div>
    </div>
  );
};


export default Explanations;



