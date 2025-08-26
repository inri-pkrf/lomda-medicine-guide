import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../PartZeroComponent/PartZero.css';


const PartZero = () => {
    const [step, setStep] = useState(1);
    const [showTextDiv, setShowTextDiv] = useState(false);
    const [showTomer, setShowTomer] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);
    const [fadeInTomer, setFadeInTomer] = useState(false);
    const [showPrevButton, setShowPrevButton] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowTextDiv(true);
        }, 100);
        return () => clearTimeout(timer);
    }, []);


    useEffect(() => {
        if (step === 2) {
            setShowTomer(true);
            setShowPrevButton(true);
            setTimeout(() => {
                setFadeInTomer(true);
            }, 50);
        }
    }, [step]);


    const handleBack = () => {
        setShowPrevButton(false);
        setFadeOut(true);
        setFadeInTomer(false);
        setTimeout(() => {
            setFadeOut(false);
            setShowTomer(false);
            setStep(1);
        }, 500);
    };

    return (
        <div id="PartZero">
            <img
                src={`${process.env.PUBLIC_URL}/Assets/PartZeroImgs/Ambulance.png`}
                alt="Ambulance"
                className="ambulance-zero"
            />

            <div className={`divText-Ambulance ${showTextDiv ? 'fade-in-zero' : ''}`}>
                {step === 1 && (
                    <div id="text-Ambulance1">
                        <h2>ברוכים הבאים והבאות ללומדת מכלול רפואה!</h2>
                        <p>
                            בלומדה זו תלמדו על תפקידו המרכזי של מכלול הרפואה במערכת החירום, תכירו את מבנה הפיקוד, שיטות העבודה והדיווח, ותתחזקו את ההבנה שלכם לגבי יחסי הגומלין בין המכלולים השונים.
                            הלומדה תלווה אתכם לאורך כל הדרך ותסייע לכם לפעול בצורה מקצועית, אחראית ויעילה בעת אירוע חירום.
                        </p>
                    </div>
                )}

                {step === 2 && (
                    <>
                        <div id="text-Ambulance2" className={fadeOut ? 'fade-out-zero' : 'fade-in-zero'}>
                            <h2>בלומדה ילווה אתכם תומר – קצין רפואה</h2>
                            <p>
                                ד"ר תומר הוא קצין רפואה אזורי המפקח על מכלולי הרפואה בזמן מצב חירום.
                                במהלך הלומדה הוא ילווה אתכם, יחלוק את הניסיון המקצועי שלו, ויעזור לכם להבין את תהליכי העבודה, קבלת ההחלטות והדיווח הנדרשים בזמן אמת.
                                דרך הסיפור שלו תבינו את חשיבות התפקיד, את הממשקים השונים במערכת החירום, ואת הדרך לנהל אירוע רפואי מורכב בצורה מקצועית ויעילה.
                            </p>
                        </div>
                        {showTomer && (
                            <img
                                src={`${process.env.PUBLIC_URL}/Assets/PartZeroImgs/Tomer.png`}
                                alt="Tomer"
                                className={`Tomer-zero ${fadeOut ? 'fade-out-zero' : fadeInTomer ? 'fade-in-zero' : ''}`}
                            />
                        )}
                    </>
                )}

                <div className="buttons-bar">
                    <div className="btn-text btn-text-prev">
                        {showPrevButton && (
                            <div onClick={handleBack}>
                                <div className="img-arrow img-arrow-prev" />
                                <div className="text-label">הקודם</div>
                            </div>
                        )}
                    </div>
                    <div className="btn-text btn-text-next">
                        {step === 1 && (
                            <div onClick={() => setStep(2)}>
                                <div className="img-arrow img-arrow-next" />
                                <div className="text-label">המשך</div>
                            </div>
                        )}
                        {step === 2 && (
                            <div className="btn-text btn-text-end" onClick={() => navigate('/part-one')}>
                                <div className="img-arrow img-arrow-end" />
                                <div className="text-label">סיום</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};


export default PartZero;



