import React from 'react';
import '../styles/Note6.css';

const Note6 = ({ onClose }) => {
  return (
    <div className="Note6">
      <div className='tape-div6'> </div>

      <div className='title-notes'>
        מבנה הפיקוד
      </div>

      <img
        src={`${process.env.PUBLIC_URL}/Assets/PartOneImgs/Notes/note6/MivnePikud.png`}
        alt="MivnePikud"
        className='MivnePikud'
      />

      <div className="buttons-bar-note6">
        <div className="btn-text btn-text-end" onClick={onClose}>
          <div className="img-arrow img-arrow-end" />
          <div className="text-label">סיום</div>
        </div>
      </div>

    </div>
  );
};

export default Note6;
