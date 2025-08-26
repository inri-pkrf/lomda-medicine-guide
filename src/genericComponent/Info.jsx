import React, { useState } from 'react';
import '../genericComponent/styles/Info.css';

const Info = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const closeInfo = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowInfo(false);
      setIsClosing(false);
    }, 400);
  };

  return (
    <>
      <img
        src={`${process.env.PUBLIC_URL}/Assets/logos/iLogo.png`}
        alt="iLogo"
        className="i-logo"
        onClick={() => setShowInfo(true)}
      />

      {showInfo && (
        <div className='info-part'>
          <div className={`info-overlay ${isClosing ? 'fade-out' : 'fade-in'}`}>
            <img
              src={`${process.env.PUBLIC_URL}/Assets/Btns/closeBlack.png`}
              alt="xbtn"
              className="xbtn"
              onClick={closeInfo}
            />
            <div className={`info-text ${isClosing ? 'pop-out' : 'pop-in'}`}>
              <u>מפתחות:</u><br />
              עלמה יובל  <br />
              אביטל גמבורג
              <br /><br />
              <u>גרפיקאיות:</u><br />
              עלמה יובל <br />
              אביטל גמבורג
              <br /><br />
              <u>מומחה תוכן:</u><br />
              סא"ל (במיל') תומר דוד<br/>
              רס"ן איריס וריאט<br/>
              סר"ן שלו אלפסי<br/>
              <br /><br />
              <u>מנהלת מחלקה:</u><br />
              תמר בוסתן
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Info;
