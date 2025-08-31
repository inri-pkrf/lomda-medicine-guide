import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../genericComponent/styles/EndPage.css';

const EndPage = () => {
  const navigate = useNavigate();

  const handleRestartLomda = () => {
    // מחיקת כל המידע מהסשן
    sessionStorage.clear();  // איפוס מוחלט של כל הנתונים
    navigate('/', { state: { fromSimulation: true } });
  };

  const handleBackToSimulation = () => {
    navigate('/simulation', { state: { fromEndPage: true } });
  };

  return (
    <div className="endpage-fullscreen">
      <h1> סיימתם את הלומדה! </h1>
      <p>כל שלבי הלמידה והסימולציה הושלמו בהצלחה.</p>

      <div className="endpage-buttons">

        <button className="btn-endpage" onClick={handleBackToSimulation}>
          חזרה לבחירת סימולציה
        </button>

        <button className="btn-endpage" onClick={handleRestartLomda}>
          סיום הלומדה
        </button>

      </div>
    </div>
  );
};

export default EndPage;
