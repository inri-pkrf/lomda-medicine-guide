import React, { useState } from 'react';
import './styles/Board.css';

const Board = ({ relation, onClose }) => {
  const [isExiting, setIsExiting] = useState(false);
  if (!relation) return null;

  const titleColor = relation.colorRelation || "rgb(80, 80, 80)";

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
    }, 400); // תואם לאורך האנימציה
  };

  return (
    <div className={`board ${isExiting ? 'board-exit' : ''}`}>
      <img
        src={`${process.env.PUBLIC_URL}/Assets/PartFourImgs/board.png`}
        alt="board"
        className="board-img"
      />
      <h2
        className="board-title"
        style={{
          color: titleColor,
          borderBottomColor: titleColor
        }}
      >
        {relation.name}
      </h2>

      <div className="board-sections-container">
        <div className="board-section">
          <h3 className="board-subtitle">נותן:</h3>
          <ul className="board-list">
            {relation.give.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="board-section">
          <h3 className="board-subtitle">מקבל:</h3>
          <ul className="board-list">
            {relation.take.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="buttons-bar-board">
        <div className="btn-text btn-text-end" onClick={handleClose}>
          <div className="img-arrow img-arrow-end" />
          <div className="text-label">סיום</div>
        </div>
      </div>
    </div>
  );
};

export default Board;
