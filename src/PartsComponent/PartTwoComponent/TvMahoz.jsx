import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../PartTwoComponent/styles/TvMahoz.css';
import mahozData from '../../Data/TvData/MahozData';


const TvMahoz = ({ onFinish, onClose }) => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const handleFinish = () => {
    // שמירת סיום ב-sessionStorage
    const completedParts = JSON.parse(sessionStorage.getItem('completedParts') || '[]');
    if (!completedParts.includes('mahoz')) {
      completedParts.push('mahoz');
      sessionStorage.setItem('completedParts', JSON.stringify(completedParts));
    }
    // קריאה לפונקציית הסיום המקורית
    onFinish();
  };


  const stepKey = step;
  const currentStep = mahozData[stepKey];
  const totalSteps = Object.keys(mahozData).length;


  return (
    <div className="TvMahoz">
      <img
          className="closeBtn-mahoz"
          src={`${process.env.PUBLIC_URL}/Assets/Btns/closeWhite.png`}
          alt="corkboard"
          onClick={onClose}
        />
      <div className="screen-mahoz">
        <img
          className="Tv-img-mahoz"
          src={`${process.env.PUBLIC_URL}/Assets/PartTwoImgs/warRoomTv.png`}
          alt="corkboard"
        />
        <h2 className='mahoz-title'>מחוז</h2>
        {/* תוכן ה-Step */}
        <div key={step} className="step-content-mahoz">
          {currentStep && (
            <div
              className={`info-mahoz
              ${currentStep?.srcImg ? 'with-image' : ''}
              ${currentStep?.roles ? 'with-roles' : ''}
              ${!currentStep?.srcImg && !currentStep?.roles ? 'no-image' : ''}
            `}
            >
              {currentStep.text}
            </div>
          )}
          {currentStep?.srcImg && (
            <img
              className={`mahoz-step-image step-${step}`}
              src={currentStep.srcImg}
              alt="מחוז"
            />
          )}




          {currentStep?.roles && (
            <div className={`scrollable-container-mahoz`}>
              <div className="mahoz-scroll-content">
                <p className='text-mahoz-scroll'> {currentStep.roles}</p>
              </div>
            </div>
          )}
          {currentStep.subroles && (
            <ul className={`subroles-list-mahoz step-${step} `}>
              {currentStep.subroles.map((role, idx) => (
                <li key={idx}>{role}</li>
              ))}
            </ul>
          )}
        </div>


        {/* כפתורי ניווט עם חצים וטקסט */}
        <div className="buttons-bar">
          <div
            className="btn-text btn-text-prev"
            style={{ visibility: step > 1 ? 'visible' : 'hidden' }}
            onClick={() => setStep(prev => Math.max(prev - 1, 1))}
          >
            <div className="img-arrow" />
            <div className="text-label">הקודם</div>
          </div>
          {step < totalSteps ? (
            <div
              className="btn-text btn-text-next"
              onClick={() => setStep(prev => Math.min(prev + 1, totalSteps))}
            >
              <div className="img-arrow" />
              <div className="text-label">המשך</div>
            </div>
          ) : (
            <div className="btn-text btn-text-end" onClick={handleFinish}>
              <div className="img-arrow" />
              <div className="text-label">סיום</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


export default TvMahoz;





























