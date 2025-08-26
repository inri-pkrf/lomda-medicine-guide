import React from 'react';
import '../styles/Note7.css';

const Note7 = ({ onClose }) => {
  return (
    <div className="Note7">
      <img
        src={`${process.env.PUBLIC_URL}/Assets/PartOneImgs/Notes/note7/tape7.png`}
        alt="tape7"
        className='tapes tape7'
      />

      <div className='title-notes'>
        התפיסה המבצעית
      </div>

      <img
        src={`${process.env.PUBLIC_URL}/Assets/PartOneImgs/Notes/note7/maaneMivzaim.png`}
        alt="maaneMivzaim"
        className='maaneMivzaim'
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

export default Note7;
