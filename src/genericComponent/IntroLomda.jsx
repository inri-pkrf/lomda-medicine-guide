import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../genericComponent/styles/IntroLomda.css';
import Info from './Info.jsx'; // <-- כאן

const IntroLomda = () => {
    const [showFullScreenPrompt, setShowFullScreenPrompt] = useState(true);
    const [showIntro, setShowIntro] = useState(false);
    const [fadeOutVideo, setFadeOutVideo] = useState(false);
    const [showSkipButton, setShowSkipButton] = useState(false);
    const [isVideoEnded, setIsVideoEnded] = useState(false);
    const [isExiting, setIsExiting] = useState(false);
    const [isRestartMode, setIsRestartMode] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const cameFromSimulation = location.state?.fromSimulation === true;
    const videoWasPlayed = sessionStorage.getItem('videoWasPlayed') === 'true';

    useEffect(() => {
        if (!videoWasPlayed && !cameFromSimulation) {
            const skipButtonTimeout = setTimeout(() => setShowSkipButton(true), 2000);
            const fadeOutTimeout = setTimeout(() => {
                setFadeOutVideo(true);
                setTimeout(() => {
                    setIsVideoEnded(true);
                    setShowIntro(true);
                    sessionStorage.setItem('videoWasPlayed', 'true');
                }, 300);
            }, 8400);
            const showIntroTimeout = setTimeout(() => setShowIntro(true), 8800);

            return () => {
                clearTimeout(skipButtonTimeout);
                clearTimeout(fadeOutTimeout);
                clearTimeout(showIntroTimeout);
            };
        } else if (videoWasPlayed) {
            setIsVideoEnded(true);
            setShowIntro(true);
        }
    }, [cameFromSimulation, videoWasPlayed]);

    useEffect(() => {
        if (cameFromSimulation) {
            setShowFullScreenPrompt(false);
            setShowIntro(true);
            setIsRestartMode(true);
            navigate(location.pathname, { replace: true, state: {} });
        }
    }, [cameFromSimulation, navigate, location.pathname]);

    const skipVideo = () => {
        setFadeOutVideo(true);
        setTimeout(() => {
            setIsVideoEnded(true);
            setShowIntro(true);
            sessionStorage.setItem('videoWasPlayed', 'true');
        }, 300);
    };

    const handleStartBtn = () => {
        setIsExiting(true);
        setTimeout(() => navigate('/part-zero'), 1200);
    };

    const handleRestart = () => {
        sessionStorage.clear();
        setIsRestartMode(false);
        setShowIntro(false);
        setShowFullScreenPrompt(false);
        navigate('/part-zero');
    };

    const handleStartVideo = () => {
        setShowFullScreenPrompt(false);
        setIsVideoEnded(false);
        setShowIntro(false);
        setShowSkipButton(false);
        setFadeOutVideo(false);
    };

    return (
        <div id="IntroLomda">
            {/* שלב ראשון – הודעת F11 */}
            {showFullScreenPrompt && (
                <>
                    <div className="fullscreen-prompt">
                        <div className="prompt-text">
                            <p>
                                ברוכים הבאים והבאות ללומדת מכלול רפואה!<br /><br />
                                להצגת הלומדה בצורה מיטבית לחצ/י על <strong>F11</strong>
                            </p>
                            <button className="btn-go" onClick={handleStartVideo}>צאו לדרך!</button>
                        </div>
                    </div>

                    <Info />
                </>
            )}

            {/* שלב שני – סרטון פתיחה */}
            {!showFullScreenPrompt && !isVideoEnded && !cameFromSimulation && !isRestartMode && !videoWasPlayed && (
                <div className={`video-section ${fadeOutVideo ? 'fade-out' : ''}`}>
                    {showSkipButton && (
                        <button className="skip" onClick={skipVideo}>&lt;&lt; דלג/י</button>
                    )}
                    <video className="video-intro" autoPlay muted playsInline>
                        <source
                            src={`${process.env.PUBLIC_URL}/Assets/intro/introVidComp.mp4`}
                            type="video/mp4"
                        />
                        Your browser does not support the video tag.
                    </video>
                </div>
            )}

            {/* שלב שלישי – מסך התחלה */}
            {showIntro && (
                <div className={`intro-section ${isExiting ? 'exit' : ''}`}>
                    <img src={`${process.env.PUBLIC_URL}/Assets/PartZeroImgs/clouds.png`} alt="clouds" className="clouds" />
                    <img src={`${process.env.PUBLIC_URL}/Assets/PartZeroImgs/hospital.png`} alt="hospital" className="hospital" />
                    <img src={`${process.env.PUBLIC_URL}/Assets/PartZeroImgs/Ambulance.png`} alt="Ambulance" className="ambulance" />

                    <div className="intro-text-slide-in text-area">
                        <h1 className="lomda-title">לומדה למכלול רפואה</h1>
                        {!isRestartMode && (
                            <button className="btn-start" onClick={handleStartBtn}>התחלה</button>
                        )}
                        {isRestartMode && (
                            <button className="btn-start" onClick={handleRestart}>התחלה מחדש</button>
                        )}
                       
                    </div>
                     {isRestartMode && (
                             <Info/>
                        )}
                </div>
            )}
        </div>
    );
};

export default IntroLomda;
