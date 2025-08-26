import React, { useEffect, useState } from 'react';
import '../styles/Note3.css';


const note3Data = [
  {
    title: ' יחצ"בים',
    image: 'yahazvim.png',
    description: `יחצ"ב – יחידה צבאית לבתי חולים, המסגרת הארגונית והסד"כ המסייע לבתי החולים לשמירה על רציפות תפקודית במצבי חירום.`,
  },
  {
    title: 'יחצ"בונים',
    image: 'Yahzavonim.jpg',
    description: `המסגרת הארוגנית והסד''כ המסייע לבתי החולים לשמירה על רציפות תפקודית במצבי החירום השונים `,
  },
  {
    title: ' גר"פים',
    image: 'garphim.png',
    description: `גר''פ- גדוד רפואה
ייעוד- להוות מסגרת לבניין כוח והפעלת כוח לכוחות הרפואה המחוזיים כמענה רפואי בדרג ב' (בתי חולים), סיוע אזרחי ורציפות תפקודית`,
  },
  {
    title: ' פל"רנים',
    image: 'prlanim.jpg',
    description: `פלר''נ- פלוגה רפואה ניידת
המסגרת הארגונית והסד''כ המעניק טיפול ומענה רפואי בדרג א' במתארים קונבנציונלים ובמתארי חל"כ `,
  },
  {
    title: 'גשד"ם',
    image: 'gadashim.png',
    description: `גשד''מ- גדוד שירותי הדם המטכלי 
אמון על תגבור תרומות הדם במרחב האזרחי בשעת חירום`,
  },
  {
    title: 'ית"ם מד"א',
    image: 'YatamMada.jpg',
    description: `ית''מ מד"א- יחידת תגבור מד"א 
בזמן חירום אמונה על שליחת חובשים לתגבר את כוחות מד"א ולתפוס כוננות יחד עם כוחות מד"א`,
  },
];

const Note3 = ({ onClose }) => {
  const [viewedCards, setViewedCards] = useState(() => {
    const saved = sessionStorage.getItem('viewedNote3');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    sessionStorage.setItem('viewedNote3', JSON.stringify(viewedCards));
  }, [viewedCards]);

  const handleHover = (index) => {
    if (!viewedCards.includes(index)) {
      setViewedCards(prev => [...prev, index]);
    }
  };

  const allCardsViewed = viewedCards.length === note3Data.length;

  return (
    <div className="Note3">
      <img
        src={`${process.env.PUBLIC_URL}/Assets/PartOneImgs/Notes/note3/tape3.png`}
        alt="tape3"
        className='tapes tape3'
      />

      <div className='title-notes'>
        סד"כ פקע"ר רפואה
      </div>

      <div className='subText-notes'>
        על מנת ללמוד על כל תפקיד יש לעבור על כל תמונה עם העכבר
      </div>

      <div className="note3-grid">
        {note3Data.map(({ title, image, description }, index) => {
          const viewed = viewedCards.includes(index);
          return (
            <div
              className={`flip-card ${viewed ? 'viewed' : ''}`}
              key={index}
              onMouseEnter={() => handleHover(index)}
            >
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <div className='note3-title'>{title}</div>
                  <img
                    src={`${process.env.PUBLIC_URL}/Assets/PartOneImgs/Notes/note3/${image}`}
                    alt={title}
                    className="note3-img"
                  />
                </div>
                <div className="flip-card-back">
                  <div className="note3-desc-title">{title}</div>
                  <p className="note3-desc">{description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {allCardsViewed && (
        <div className="buttons-bar-note3">
          <div className="btn-text btn-text-end" onClick={onClose}>
            <div className="img-arrow img-arrow-end" />
            <div className="text-label">סיום</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Note3;
