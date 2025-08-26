import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../PartTwoComponent/styles/TvNafa.css';
import NafaData from '../../Data/TvData/NafaData';
import PopUp from '../../genericComponent/PopUp';




const TvNafa = ({ onFinish, onClose }) => {
  const nafaStep0Buttons = ['1', '2', '3', '4', '5', '6'];
  const nafaStep3Buttons = ['1', '2', '3', '4', '5', '6', '7'];
  const [step, setStep] = useState(0);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupContent, setPopupContent] = useState({ title: '', content: '', color: '' });
  const [step0ClickedButtons, setStep0ClickedButtons] = useState(() => {
    const stored = JSON.parse(sessionStorage.getItem('nafaStep0ClickedButtons') || '[]');
    return new Set(stored);
  });
  const [step3ClickedButtons, setStep3ClickedButtons] = useState(() => {
    const stored = JSON.parse(sessionStorage.getItem('nafaStep3ClickedButtons') || '[]');
    return new Set(stored);
  });
  const [refuaImgShown, setRefuaImgShown] = useState(() => {
    return nafaStep0Buttons.every(id => step0ClickedButtons.has(id));
  });


  const [showContinue, setShowContinue] = useState(() => {
    return nafaStep0Buttons.every(id => step0ClickedButtons.has(id));
  });


  const [canFinish, setCanFinish] = useState(() => {
    const has1to5 = ['1', '2', '3', '4', '5'].every(id => step3ClickedButtons.has(id));
    const has6or7 = step3ClickedButtons.has('6') || step3ClickedButtons.has('7');
    return has1to5 && has6or7;
  });


  useEffect(() => {
    if (step === 0) {
      const allStep0Clicked = nafaStep0Buttons.every(id => step0ClickedButtons.has(id));
      setRefuaImgShown(allStep0Clicked);
      setShowContinue(allStep0Clicked);
    }




    if (step === 3) {
      const has1to5 = ['1', '2', '3', '4', '5'].every(id => step3ClickedButtons.has(id));
      const has6or7 = step3ClickedButtons.has('6') || step3ClickedButtons.has('7');
      setCanFinish(has1to5 && has6or7);
    }
  }, [step0ClickedButtons, step3ClickedButtons, step]);




  const handlePressed = (id) => {
    const idStr = String(id);
    console.log("כפתור נלחץ:", idStr);




    if (step === 0) {
      setStep0ClickedButtons(prev => {
        if (prev.has(idStr)) return prev;
        const newSet = new Set(prev);
        newSet.add(idStr);
        sessionStorage.setItem('nafaStep0ClickedButtons', JSON.stringify([...newSet]));
        return newSet;
      });
    } else if (step === 3) {
      setStep3ClickedButtons(prev => {
        if (prev.has(idStr)) return prev;
        const newSet = new Set(prev);
        newSet.add(idStr);
        // אם לחצו על 6 או 7, נוסיף את שניהם
        if (idStr === '6' || idStr === '7') {
          newSet.add('6');
          newSet.add('7');
        }
        sessionStorage.setItem('nafaStep3ClickedButtons', JSON.stringify([...newSet]));
        return newSet;
      });
    }


    const stepData = NafaData[step];
    if (stepData?.rolesBtn?.[idStr]) {
      const role = stepData.rolesBtn[idStr];
      setPopupContent({
        title: role.title || 'פריט מידע',
        content: role.content || '',
        color: role.color || '',
      });
      setPopupVisible(true);
    }
  };


  const handleFinish = () => {
    const completedParts = JSON.parse(sessionStorage.getItem('completedParts') || '[]');
    if (!completedParts.includes('nafa')) {
      completedParts.push('nafa');
      sessionStorage.setItem('completedParts', JSON.stringify(completedParts));
    }
    onFinish();
  };
  const totalSteps = Object.keys(NafaData).length - 1;
  const currentStep = NafaData[step];




  return (
    <div className="TvNafa">
       <img
          className="closeBtn-mahoz"
          src={`${process.env.PUBLIC_URL}/Assets/Btns/closeWhite.png`}
          alt="corkboard"
          onClick={onClose}
        />
      <img
        className="Tv-img-nafa"
        src={`${process.env.PUBLIC_URL}/Assets/PartTwoImgs/warRoomTv.png`}
        alt="corkboard"
      />


      {/* שלב 0 */}
      {step === 0 && (
        <div className="intro-step-container screen-nafa">
          <img
            className="Tv-img-nafa-0"
            src={`${process.env.PUBLIC_URL}/Assets/PartTwoImgs/Nafa/mivneNafa1.png`}




            alt="mivneNafa"
          />
          <h2 className="nafa-title">נפה</h2>


          {currentStep && (
            <div className={`info-nafa ${currentStep?.srcImg ? 'with-image' : 'no-image'}`}>
              {currentStep.text}
            </div>
          )}


          <div className="intro-buttons-group-nafa position-step-zero">
            {nafaStep0Buttons.map((id) => (
              <button
                key={id}
                id={`btn-${id}-nafa`}
                className={`intro-button-nafa ${step0ClickedButtons.has(id) ? 'completed-nafa-btn' : ''}`}
                onClick={() => handlePressed(id)}
              />
            ))}
          </div>
        </div>
      )}


      {/* 3 */}
      {step === 3 && (
        <div className="intro-step-container screen-nafa">
          {currentStep?.srcImg && (
            <img className={`nafa-step-image step-${step}`} src={currentStep.srcImg} alt="מחוז" />
          )}
          <h2 className="nafa-title">נפה</h2>


          {currentStep && (
            <div className={`info-nafa ${currentStep?.srcImg ? 'with-image' : 'no-image'}`}>
              {currentStep.text}
            </div>
          )}


          <div className="intro-buttons-group-nafa-3 position-other-steps">
            {nafaStep3Buttons.map((id) => (
              <button
                key={id}
                id={`btn-step3-${id}`}
                className={`intro-button-nafa-3 ${(id === '6' || id === '7')
                  ? (step3ClickedButtons.has('6') || step3ClickedButtons.has('7') ? 'completed-nafa-btn-3' : '')
                  : (step3ClickedButtons.has(id) ? 'completed-nafa-btn-3' : '')
                  }`}
                onClick={() => handlePressed(id)}
              />
            ))}
          </div>
        </div>
      )}


      {/* שאר השלבים */}
      {step !== 0 && step !== 3 && (
        <div className="screen-nafa">
          <h2 className="nafa-title">נפה</h2>


          <div key={step} className="step-content-nafa">
            {currentStep && (
              <div
                className={`info-nafa
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
                className={`nafa-step-image step-${step}`}
                src={currentStep.srcImg}
                alt="מחוז"
              />
            )}


            {currentStep?.roles && (
              <div className="scrollable-container-nafa">
                <div className="nafa-scroll-content">
                  <p className="text-nafa-scroll">{currentStep.roles}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}


      {/* כפתורי ניווט + סיום */}
      {(step > 0 || showContinue) && (
        <div className="buttons-bar">
          <div
            className="btn-text btn-text-prev"
            style={{ visibility: step > 0 ? 'visible' : 'hidden' }}
            onClick={() => setStep(prev => Math.max(prev - 1, 0))}
          >
            <div className="img-arrow" />
            <div className="text-label">הקודם</div>
          </div>


          {step < totalSteps ? (
            <div
              className="btn-text btn-text-next"
              onClick={() => setStep((prev) => Math.min(prev + 1, totalSteps))}
            >
              <div className="img-arrow" />
              <div className="text-label">המשך</div>
            </div>
          ) : canFinish && (
            <div
              className="btn-text btn-text-end"
              onClick={handleFinish}
            >
              <div className="img-arrow" />
              <div className="text-label">סיום</div>
            </div>
          )}
        </div>
      )}


      <PopUp
        isVisible={popupVisible}
        onClose={() => setPopupVisible(false)}
        title={popupContent.title}
        content={popupContent.content}
        color={popupContent.color}
      />
    </div>
  );
};




export default TvNafa;









