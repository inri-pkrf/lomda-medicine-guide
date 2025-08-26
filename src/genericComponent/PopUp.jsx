import React, { useEffect, useState } from 'react';
import '../genericComponent/styles/PopUp.css';


const PopUp = ({ isVisible, onClose, title, content, color }) => {
  const [shouldRender, setShouldRender] = useState(isVisible);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
      setClosing(false);
    } else if (shouldRender) {
      setClosing(true);
      const timeout = setTimeout(() => {
        setShouldRender(false);
        setClosing(false);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [isVisible, shouldRender]);

  if (!shouldRender) return null;


  return (
    <div className={`popup-overlay ${closing ? 'popup-overlay-hide' : ''}`}>
      <div className={`popup-content ${closing ? 'popup-content-hide' : ''}`}>
        <button className="popup-close-button" onClick={onClose}>
          <img src={`${process.env.PUBLIC_URL}/Assets/Btns/closeBlack.png`} alt="Close" className="XBtn" />
        </button>
        <h2 className="popup-title">{title}</h2>
        <div className="popup-body">
          <div className="popup-body-text">{content}</div>
        </div>
      </div>
    </div>
  );
};


export default PopUp;



