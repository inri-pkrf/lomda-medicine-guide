import './App.css';
import { HashRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import React from 'react';

import IntroLomda from './genericComponent/IntroLomda'
import NavBar from './genericComponent/NavBar'
import Questions from './genericComponent/Questions'
import PartZero from './PartsComponent/PartZeroComponent/PartZero';
import PartOne from './PartsComponent/PartOneComponent/PartOne';
import PartTwo from './PartsComponent/PartTwoComponent/PartTwo';
import PartThree from './PartsComponent/PartThreeComponent/PartThree';
import PartFour from './PartsComponent/PartFourComponent/PartFour';
import Simulation from './PartsComponent/SimulationComponent/Simulation';

const SimulationWrapper = () => {
  const navigate = useNavigate();

  const handleFinishSimulation = () => {
    navigate('/', { state: { fromSimulation: true } });
  };

  return <Simulation onFinishSimulation={handleFinishSimulation} />;
};

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [hideNavBar, setHideNavBar] = React.useState(false);

  return (
    <div className="App">
      <img
        src={`${process.env.PUBLIC_URL}/Assets/logos/logo.png`}
        alt="main-logo"
        className="main-logo"
        onClick={() => navigate('/part-zero')}
      />

      <div style={{ display: "none" }}>
        <div className="btn-text btn-text-prev">
          <div className="img-arrow img-arrow-prev" />
          <div className="text-label"></div>
        </div>

        <div className="btn-text btn-text-next">
          <div className="img-arrow img-arrow-next" />
          <div className="text-label"></div>
        </div>

        <div className="btn-text btn-text-end">
          <div className="img-arrow img-arrow-end" />
          <div className="text-label"></div>
        </div>
      </div>

      {location.pathname !== '/' && <NavBar hideNavBar={hideNavBar} />}

      <Routes>
        <Route path="/" element={<IntroLomda />} />
        <Route path="part-zero" element={<PartZero />} />
        <Route path="part-one" element={<PartOne setHideNavBar={setHideNavBar} />} />
        <Route path="part-two" element={<PartTwo setHideNavBar={setHideNavBar} />} />
        <Route path="part-three" element={<PartThree setHideNavBar={setHideNavBar} />} />
        <Route path="part-four" element={<PartFour setHideNavBar={setHideNavBar} />} />
        <Route path="simulation" element={<SimulationWrapper />} />
        <Route path="/questions/:chapter" element={<Questions />} />
      </Routes>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
