import React, { useState, useEffect, useRef } from 'react';
import './styles/PartFour.css';
import relationsData from '../../Data/BoardData/RelationsData';
import Explanations from '../../genericComponent/Explanations';
import Board from './Board';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import NavigationButtons from '../../genericComponent/NavigationButtons';

const PartFour = ({ setHideNavBar }) => {
  const navigate = useNavigate();
  const timerRef = useRef(null);
  const location = useLocation();
  const reviewMode = location.state?.reviewMode || false;
  const chapterName = "PartFour";
  const [started, setStarted] = useState(() => sessionStorage.getItem("partFourStarted") === "true");
  const [finished, setFinished] = useState(() => sessionStorage.getItem("partFourFinished") === "true");
  const [endShown, setEndShown] = useState(() => sessionStorage.getItem("partFourEndShown") === "true");
  const [explanationStage, setExplanationStage] = useState(() => {
    if (finished && endShown) return null;
    if (!started) return "start";
    return null;
  });
  const [backgroundImage, setBackgroundImage] = useState(`${process.env.PUBLIC_URL}/Assets/PartFourImgs/meetingRoomNew.png`);
  const [selectedRelation, setSelectedRelation] = useState(null);
  const [hoveredRelationId, setHoveredRelationId] = useState(null);
  const [visitedRelations, setVisitedRelations] = useState(() => {
    const saved = sessionStorage.getItem('visitedRelationsPartFour');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (selectedRelation !== null && !started) {
      sessionStorage.setItem("partFourStarted", "true");
      setStarted(true);
    }
  }, [selectedRelation, started]);

  useEffect(() => {
    sessionStorage.setItem('visitedRelationsPartFour', JSON.stringify(visitedRelations));
  }, [visitedRelations]);

  useEffect(() => {
    const allVisited = relationsData.every(rel => visitedRelations.includes(rel.id));

    if (allVisited && !finished) {
      sessionStorage.setItem("partFourFinished", "true");

      if (!endShown) {
        const timer = setTimeout(() => {
          setExplanationStage("end");
          sessionStorage.setItem("partFourEndShown", "true");
          setEndShown(true);
        }, 1000);

        return () => clearTimeout(timer);
      }
    }
  }, [visitedRelations, finished, endShown]);

  useEffect(() => {
    if (!setHideNavBar) return;
    setHideNavBar(selectedRelation !== null);
  }, [selectedRelation, setHideNavBar]);

  const handleCloseExplanation = () => {
    setExplanationStage(null);
  };

  const handleHover = (id) => {
    const found = relationsData.find(item => item.id === id);
    if (found) {
      setBackgroundImage(found.ImgSrc);
      setHoveredRelationId(id);
    }
  };

  const resetBackground = () => {
    if (!selectedRelation) {
      setBackgroundImage(`${process.env.PUBLIC_URL}/Assets/PartFourImgs/meetingRoomNew.png`);
    }
    setHoveredRelationId(null);
  };

  const handleClick = (id) => {
    const found = relationsData.find(item => item.id === id);
    if (found) {
      setSelectedRelation(found);
      setBackgroundImage(found.ImgSrc);
    }
  };

  const closeBoard = () => {
    if (selectedRelation && !visitedRelations.includes(selectedRelation.id)) {
      const updated = [...visitedRelations, selectedRelation.id];
      setVisitedRelations(updated);
    }
    setSelectedRelation(null);
    setBackgroundImage(`${process.env.PUBLIC_URL}/Assets/PartFourImgs/meetingRoomNew.png`);
  };

  return (
    <div className="PartFour">
      {explanationStage && (
        <Explanations
          chapterName={chapterName}
          position={explanationStage}
          isChapterFinished={explanationStage === "end"}
          onClose={handleCloseExplanation}
        />
      )}

      <img src={backgroundImage} alt="background" className="background-part4" />

      {relationsData.map((relation) => {
        const isHovered = hoveredRelationId === relation.id;
        const isSelected = selectedRelation?.id === relation.id;
        const isVisited = visitedRelations.includes(relation.id);
        const shouldHighlight = isHovered || isSelected || isVisited;

        return (
          <div
            key={relation.id}
            className={`relation-label ${relation.id}-label`}
            style={{
              border: `3px solid ${relation.colorRelation}`,
              color: shouldHighlight ? 'white' : relation.colorRelation,
              backgroundColor: shouldHighlight ? relation.colorRelation : 'transparent',
              transition: '0.3s ease',
              transform: isHovered ? 'scale(1.05)' : 'scale(0.95)',
            }}
            onClick={() => handleClick(relation.id)}
            onMouseEnter={() => handleHover(relation.id)}
            onMouseLeave={resetBackground}
          >
            {relation.name}
          </div>
        );
      })}

      <img
        src={`${process.env.PUBLIC_URL}/Assets/PartFourImgs/TomerBack.png`}
        alt="tomer"
        className="tomer-back"
      />

      <div id='relations1' className='people-area modain-area' onMouseEnter={() => handleHover('relations1')} onMouseLeave={resetBackground} onClick={() => handleClick('relations1')} />
      <div id='relations2' className='people-area lashcab-area' onMouseEnter={() => handleHover('relations2')} onMouseLeave={resetBackground} onClick={() => handleClick('relations2')} />
      <div id='relations3' className='people-area mada-area' onMouseEnter={() => handleHover('relations3')} onMouseLeave={resetBackground} onClick={() => handleClick('relations3')} />
      <div id='relations4' className='people-area malka-area' onMouseEnter={() => handleHover('relations4')} onMouseLeave={resetBackground} onClick={() => handleClick('relations4')} />
      <div id='relations5' className='people-area mivzaim-area' onMouseEnter={() => handleHover('relations5')} onMouseLeave={resetBackground} onClick={() => handleClick('relations5')} />
      <div id='relations6' className='people-area shoolhan-area' onMouseEnter={() => handleHover('relations6')} onMouseLeave={resetBackground} onClick={() => handleClick('relations6')} />
      <div id='relations7' className='people-area uxluxsia-area' onMouseEnter={() => handleHover('relations7')} onMouseLeave={resetBackground} onClick={() => handleClick('relations7')} />
      <div id='relations8' className='people-area tikshuv-area' onMouseEnter={() => handleHover('relations8')} onMouseLeave={resetBackground} onClick={() => handleClick('relations8')} />

      {selectedRelation && (
        <Board relation={selectedRelation} onClose={closeBoard} />
      )}

          <NavigationButtons endShownKey="partFourEndShown" />

    </div>
  );
};

export default PartFour;
