import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './styles/PartThree.css';
import NavigationButtons from '../../genericComponent/NavigationButtons';

import CardMedicine from './Cards/CardMedicine';
import CardReport from './Cards/CardReport';
import CardParlag from './Cards/CardParlag';
import Explanations from '../../genericComponent/Explanations';

const PartThree = ({ setHideNavBar }) => {
  const location = useLocation();
  const reviewMode = location.state?.reviewMode || false;
  const chapterName = "PartThree";
  const allItems = ['case', 'phone', 'vest'];

  // קריאה מה-sessionStorage
  const [started, setStarted] = useState(() => sessionStorage.getItem("partThreeStarted") === "true");
  const [finished, setFinished] = useState(() => sessionStorage.getItem("partThreeFinished") === "true");
  const [endShown, setEndShown] = useState(() => sessionStorage.getItem("partThreeEndShown") === "true");

  const [explanationStage, setExplanationStage] = useState(() => {
    if (finished && endShown) return null; // אל תציג שוב סיום
    if (!started) return "start";          // הראה פתיחה אם לא התחלת
    return null;
  });

  const [hoveredItem, setHoveredItem] = React.useState(null);
  const [activeCard, setActiveCard] = React.useState(null);
  const [completedItems, setCompletedItems] = React.useState(() => {
    const saved = sessionStorage.getItem('completedItemsPartThree');
    return saved ? JSON.parse(saved) : [];
  });

  // סימון התחלת פרק
  useEffect(() => {
    if (activeCard !== null && !started) {
      sessionStorage.setItem("partThreeStarted", "true");
      setStarted(true); // ← חשוב!
    }
  }, [activeCard, started]);

  // שמירת כרטיסים שהושלמו
  useEffect(() => {
    sessionStorage.setItem('completedItemsPartThree', JSON.stringify(completedItems));
  }, [completedItems]);

  // מנגנון סיום כמו בפרק 2 — דיליי 1 שניה, הצגה פעם אחת
  useEffect(() => {
    const allCompleted = allItems.every(item => completedItems.includes(item));

    if (allCompleted && !finished) {
      sessionStorage.setItem("partThreeFinished", "true");

      // אם כבר הוצג הסיום - אל תציג שוב
      if (!endShown) {
        const timer = setTimeout(() => {
          setExplanationStage("end");
          sessionStorage.setItem("partThreeEndShown", "true");
          setEndShown(true);
        }, 1000);

        return () => clearTimeout(timer);
      }
    }
  }, [completedItems, finished, endShown]);

  const closeExplanation = () => {
    setExplanationStage(null);
  };

  const [isClosing, setIsClosing] = useState(false);

  const handleCloseCard = () => {
    if (activeCard && !completedItems.includes(activeCard)) {
      setCompletedItems(prev => [...prev, activeCard]);
    }

    setIsClosing(true); // הפעל אנימציית יציאה

    setTimeout(() => {
      setActiveCard(null);
      setIsClosing(false);
    }, 500); // תיאום עם משך האנימציה ב־CSS
  };

  useEffect(() => {
    if (!setHideNavBar) return;
    setHideNavBar(activeCard !== null);
  }, [activeCard, setHideNavBar]);

  const backgroundSrc = hoveredItem
    ? `${process.env.PUBLIC_URL}/Assets/PartThreeImgs/${hoveredItem}-site.png`
    : `${process.env.PUBLIC_URL}/Assets/PartThreeImgs/destractionSite.png`;

  return (
    <div className="PartThree">
      {explanationStage && (
        <Explanations
          chapterName={chapterName}
          position={explanationStage}
          isChapterFinished={explanationStage === "end"}
          onClose={closeExplanation}
        />
      )}
      <img src={backgroundSrc} alt="background" className="background-part3" />

      {!explanationStage && (
        <>
          <img
            src={`${process.env.PUBLIC_URL}/Assets/PartThreeImgs/ThomerShocked.png`}
            alt="Tomer"
            className="Tomer-three"
          />
          <div className="speechBubbleThree">
            יש למצוא את החפצים הקבורים בהריסות
          </div>
          <img
            src={`${process.env.PUBLIC_URL}/Assets/PartThreeImgs/case.png`}
            alt="case"
            className={`items-three case ${completedItems.includes('case') ? 'item-complete' : ''}`}
          />
          <img
            src={`${process.env.PUBLIC_URL}/Assets/PartThreeImgs/phone.png`}
            alt="phone"
            className={`items-three phone ${completedItems.includes('phone') ? 'item-complete' : ''}`}
          />
          <img
            src={`${process.env.PUBLIC_URL}/Assets/PartThreeImgs/vest.png`}
            alt="vest"
            className={`items-three vest ${completedItems.includes('vest') ? 'item-complete' : ''}`}
          />
        </>
      )}

      <div
        className='case-area items-area'
        onMouseEnter={() => setHoveredItem('case')}
        onMouseLeave={() => setHoveredItem(null)}
        onClick={() => setActiveCard('case')}
      />
      <div
        className='phone-area items-area'
        onMouseEnter={() => setHoveredItem('phone')}
        onMouseLeave={() => setHoveredItem(null)}
        onClick={() => setActiveCard('phone')}
      />
      <div
        className='vest-area items-area'
        onMouseEnter={() => setHoveredItem('vest')}
        onMouseLeave={() => setHoveredItem(null)}
        onClick={() => setActiveCard('vest')}
      />

      {activeCard && (
        <div className={`card-overlay ${isClosing ? 'fade-out-part-three' : 'fade-in-part-three'}`}>
          <div className={`card ${activeCard}-border`}>
            {activeCard === 'case' && <CardMedicine onCloseCard={handleCloseCard} />}
            {activeCard === 'phone' && <CardReport onCloseCard={handleCloseCard} />}
            {activeCard === 'vest' && <CardParlag onCloseCard={handleCloseCard} />}
          </div>
        </div>
      )}

       <NavigationButtons endShownKey="partThreeEndShown" />


    </div>
  );
};

export default PartThree;
