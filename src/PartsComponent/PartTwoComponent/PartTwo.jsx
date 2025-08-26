import React, { useState, useEffect } from 'react';
import Explanations from '../../genericComponent/Explanations';
import { useLocation } from 'react-router-dom';
import TvMahoz from '../PartTwoComponent/TvMahoz';
import TvNafa from '../PartTwoComponent/TvNafa';
import '../PartTwoComponent/styles/PartTwo.css';
import NavigationButtons from '../../genericComponent/NavigationButtons';


const PartTwo = ({ setHideNavBar }) => {
  const location = useLocation();
  const reviewMode = location.state?.reviewMode || false; // מצב סקירה, אם קיים
  const chapterName = "PartTwo";


  const started = sessionStorage.getItem("partTwoStarted") === "true";
  const finished = sessionStorage.getItem("partTwoFinished") === "true";
  const endShown = sessionStorage.getItem("partTwoEndShown") === "true";


  const [explanationStage, setExplanationStage] = useState(() => {
    if (finished && endShown) return null;
    if (!started) return "start";
    return null;
  });


  const [activeComponent, setActiveComponent] = useState("none");


  const [mahozCompleted, setMahozCompleted] = useState(() => {
    return sessionStorage.getItem("mahozCompleted") === "true";
  });
  const [nafaCompleted, setNafaCompleted] = useState(() => {
    return sessionStorage.getItem("nafaCompleted") === "true";
  });


  useEffect(() => {
    if (activeComponent !== "none" && !started) {
      sessionStorage.setItem("partTwoStarted", "true");
      setExplanationStage(null);
    }
  }, [activeComponent, started]);


  useEffect(() => {
    sessionStorage.setItem("mahozCompleted", mahozCompleted);
    sessionStorage.setItem("nafaCompleted", nafaCompleted);
  }, [mahozCompleted, nafaCompleted]);


  useEffect(() => {
    if (mahozCompleted && nafaCompleted && !endShown) {
      const timer = setTimeout(() => {
        sessionStorage.setItem("partTwoFinished", "true");
        sessionStorage.setItem("partTwoEndShown", "true");
        setExplanationStage("end");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [mahozCompleted, nafaCompleted, endShown]);


  useEffect(() => {
    if (!setHideNavBar) return;
    setHideNavBar(activeComponent === "mahoz" || activeComponent === "nafa");
  }, [activeComponent, setHideNavBar]);


  // סגירת ההסבר
  const closeExplanation = () => {
    setExplanationStage(null);
  };


  return (
    <div className="PartTwo">


      {explanationStage && (
        <Explanations
          chapterName={chapterName}
          position={explanationStage}
          onClose={closeExplanation}
        />
      )}


      {!explanationStage && activeComponent === "none" && (
        <img
          className="tomerThinkingPartTwo"
          src={`${process.env.PUBLIC_URL}/Assets/PartTwoImgs/TomerThinking.png`}
          alt="טומר חושב"
        />
      )}


      <div
        className={`nafaTvBtn ${nafaCompleted ? 'completed-nafa' : ''}`}
        onClick={() => setActiveComponent("nafa")}
      >
        נפה
      </div>


      <div
        className={`mahozTvBtn ${mahozCompleted ? 'completed-mahoz' : ''}`}
        onClick={() => setActiveComponent("mahoz")}
      >
        מחוז
      </div>


      {activeComponent === "nafa" && (
        <TvNafa
          onFinish={() => {
            setNafaCompleted(true);
            setActiveComponent("none");
          }}
          onClose={() => setActiveComponent("none")}
        />
      )}


      {activeComponent === "mahoz" && (
        <TvMahoz
          onFinish={() => {
            setMahozCompleted(true);
            setActiveComponent("none");
          }}
          onClose={() => setActiveComponent("none")}
        />
      )}

      <NavigationButtons endShownKey="partTwoEndShown" />


    </div>
  );
};


export default PartTwo;



