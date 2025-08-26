import React, { useState, useEffect } from 'react';
import '../styles/Note5.css';


const mahozData = {
  north: {
    name: 'מחוז צפון',
    icon: 'icon-north.png',
    backgroundColor: '#d9f5d3',
    rasuyot: 67,
    population: '981,113',
    map: 'צפון.png',
  },
  hifa: {
    name: 'מחוז חיפה',
    icon: 'icon-haifa.png',
    backgroundColor: '#e0e0e0',
    rasuyot: 57,
    population: '1,620,008',
    map: 'חיפה.png',
  },
  dan: {
    name: 'מחוז דן',
    icon: 'icon-dan.png',
    backgroundColor: '#fff6cd',
    rasuyot: 37,
    population: '2,501,647',
    map: 'דן.png',
  },
  merkaz: {
    name: 'מחוז י-ם והמרכז',
    icon: 'icon-merkaz.png',
    backgroundColor: '#dce7ff',
    rasuyot: 33,
    population: '2,602,926',
    map: 'מרכז.png',
  },
  south: {
    name: 'מחוז דרום',
    icon: 'icon-south.png',
    backgroundColor: '#ffe2d3',
    rasuyot: 38,
    population: '1,272,302',
    map: 'דרום.png',
  },
  pakmaz: {
    name: 'פקמ"ז',
    icon: 'pkmaz-icon.png',
    backgroundColor: '#96d2f5ff',
    rasuyot: 21,
    population: '386,075',
    map: 'דרום.png',
  },
  padam: {
    name: 'פד"ם',
    icon: 'padam-icon.png',
    backgroundColor: '#faaaaaff',
    rasuyot: 4,
    population: '61,075',
    map: 'דרום.png',
  },
};




const Note5 = ({ onClose }) => {
  const [hoveredMahoz, setHoveredMahoz] = useState(null);
  const [viewedMahozes, setViewedMahozes] = useState(() => {
    const saved = sessionStorage.getItem('viewedMahozes');
    return saved ? JSON.parse(saved) : [];
  });
  const allMahozes = Object.keys(mahozData);
  const allViewed = allMahozes.every(mahoz => viewedMahozes.includes(mahoz));


  useEffect(() => {
    sessionStorage.setItem('viewedMahozes', JSON.stringify(viewedMahozes));
  }, [viewedMahozes]);


  const handleHoverMahoz = (id) => {
    setHoveredMahoz(id);
    if (!viewedMahozes.includes(id)) {
      setViewedMahozes([...viewedMahozes, id]);
    }
  };


  const handleLeaveMahoz = () => {
    setHoveredMahoz(null);
  };


  return (
    <div className="Note5">
      <img
        src={`${process.env.PUBLIC_URL}/Assets/PartOneImgs/Notes/note5/tape5.png`}
        alt="tape5"
        className='tapes'
        id='tape5-one'
      />
      <img
        src={`${process.env.PUBLIC_URL}/Assets/PartOneImgs/Notes/note5/tape5.png`}
        alt="tape5"
        className='tapes'
        id='tape5-two'
      />


      <div className='title-notes'>מחוזות פקע"ר</div>


      <div className='subText-notes'>
        מצורפת מפת ארץ ישראל עם החלוקה למחוזות פיקוד העורף. <br />
        על מנת ללמוד על כל מחוז יש לעבור על אזור המחוז במפה עם העכבר
      </div>


      <img
        src={`${process.env.PUBLIC_URL}/Assets/PartOneImgs/Notes/note5/${hoveredMahoz ? mahozData[hoveredMahoz].map : 'מפה לא חשוך.png'}`}
        alt="map-mahozot"
        className='map-mahozot'
      />


      {/* אינטראקטיביים על המפה */}
      <div className='divMap-mahozot' id='mahoz-north1' onMouseEnter={() => handleHoverMahoz('north')} onMouseLeave={handleLeaveMahoz} />
      <div className='divMap-mahozot' id='mahoz-north2' onMouseEnter={() => handleHoverMahoz('north')} onMouseLeave={handleLeaveMahoz} />
      <div className='divMap-mahozot' id='mahoz-hifa' onMouseEnter={() => handleHoverMahoz('hifa')} onMouseLeave={handleLeaveMahoz} />
      <div className='divMap-mahozot' id='mahoz-dan' onMouseEnter={() => handleHoverMahoz('dan')} onMouseLeave={handleLeaveMahoz} />
      <div className='divMap-mahozot' id='mahoz-merkaz1' onMouseEnter={() => handleHoverMahoz('merkaz')} onMouseLeave={handleLeaveMahoz} />
      <div className='divMap-mahozot' id='mahoz-merkaz2' onMouseEnter={() => handleHoverMahoz('merkaz')} onMouseLeave={handleLeaveMahoz} />
      <div className='divMap-mahozot' id='mahoz-south' onMouseEnter={() => handleHoverMahoz('south')} onMouseLeave={handleLeaveMahoz} />
      <div className='divMap-mahozot' id='mahoz-pakmaz1' onMouseEnter={() => handleHoverMahoz('pakmaz')} onMouseLeave={handleLeaveMahoz} />
      <div className='divMap-mahozot' id='mahoz-pakmaz2' onMouseEnter={() => handleHoverMahoz('pakmaz')} onMouseLeave={handleLeaveMahoz} />
      <div className='divMap-mahozot' id='mahoz-pakmaz3' onMouseEnter={() => handleHoverMahoz('pakmaz')} onMouseLeave={handleLeaveMahoz} />
      <div className='divMap-mahozot' id='mahoz-padam1' onMouseEnter={() => handleHoverMahoz('padam')} onMouseLeave={handleLeaveMahoz} />
      <div className='divMap-mahozot' id='mahoz-padam2' onMouseEnter={() => handleHoverMahoz('padam')} onMouseLeave={handleLeaveMahoz} />
      <div className='divMap-mahozot' id='mahoz-padam3' onMouseEnter={() => handleHoverMahoz('padam')} onMouseLeave={handleLeaveMahoz} />


      {/* <img
        src={`${process.env.PUBLIC_URL}/Assets/PartOneImgs/Notes/note5/מחוז דן.png`}
        id='mahoz-dan'
        onMouseEnter={() => handleHoverMahoz('dan')} onMouseLeave={handleLeaveMahoz}
      /> */}


 
      {hoveredMahoz && (
        <div className="hoveredMahoz-card" style={{ backgroundColor: mahozData[hoveredMahoz].backgroundColor }}>
          <div className="iconMahoz-title-hover" style={{
            marginBottom: hoveredMahoz === 'pakmaz' || hoveredMahoz === 'padam' ? '7  vh' : ''
          }}>{mahozData[hoveredMahoz].name} </div>
          <img
            src={`${process.env.PUBLIC_URL}/Assets/PartOneImgs/Notes/note5/icons/${mahozData[hoveredMahoz].icon}`}
            alt={mahozData[hoveredMahoz].name}
            className="iconMahoz-img-hover"
          />
          <div className="iconMahoz-text-hover">רשויות: {mahozData[hoveredMahoz].rasuyot}</div>
          <div className="iconMahoz-text-hover">תושבים: {mahozData[hoveredMahoz].population}</div>
        </div>
      )}


      {/* אייקונים מוצגים */}
      <div className='iconMahoz-container'>
        {viewedMahozes.map((id) => (
          <div key={id} className="iconMahoz-box" style={{ backgroundColor: mahozData[id].backgroundColor }}>
            <div className="iconMahoz-title" style={{
              backgroundColor: mahozData[id].backgroundColor,
              bottom: id === 'pakmaz' || id === 'padam' ? '-30px' : '',
            }}>{mahozData[id].name}</div>
            <img
              src={`${process.env.PUBLIC_URL}/Assets/PartOneImgs/Notes/note5/icons/${mahozData[id].icon}`}
              alt={mahozData[id].name}
              className="iconMahoz-img"
            />
            {/* <div className="iconMahoz-text">רשויות: {mahozData[id].rasuyot}</div>
            <div className="iconMahoz-text">תושבים: {mahozData[id].population}</div> */}
          </div>
        ))}
      </div>


      {allViewed && (
        <div className="buttons-bar-note5">
          <div className="btn-text btn-text-end" onClick={onClose}>
            <div className="img-arrow img-arrow-end" />
            <div className="text-label">סיום</div>
          </div>
        </div>
      )}
    </div>
  );
};


export default Note5;

