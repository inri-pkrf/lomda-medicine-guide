import React, { useState } from 'react';
import '../styles/CardParlag.css';

const CardParlag = ({ onCloseCard }) => {
    const [step, setStep] = useState(1);

    const handleNext = () => setStep(2);
    const handleBack = () => setStep(1);

    return (
        <div className="CardParlag">
            <img
                src={`${process.env.PUBLIC_URL}/Assets/PartThreeImgs/vest.png`}
                alt="vest"
                className="img-card-vest"
            />
            <div className='title-card'>הפלר"ג:</div>

            <div className='content-palrag'>
                {step === 1 && (
                    <div className='part1-palrag fade-palrag-text'>
                        <ul>
                            <li>פלר"ג - פלוגת רפואה הפועלת במסגרת גדוד החילוץ</li>
                            <li>
                                סד"כ הרפואה מחולק על פי שיטת ההפעלה ל צוותי רפואה: 
                                <ul className="inner-list">
                                    <li>מטפל בכיר</li>
                                    <li> חובשים</li>
                                    <li>נהג אמבולנס</li>
                                </ul>
                            </li>
                            <li>
                                הפלוגה כוללת:
                                <ul className="inner-list">
                                    <li>מ"פ</li>
                                    <li>סמ"פ</li>
                                    <li>רס"פ</li>
                                    <li> מטפלים בכירים</li>
                                    <li> חובשים</li>
                                    <li> נהגים</li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                )}

                {step === 2 && (
                    <div className='part2-palrag fade-palrag-image'>
                        <img
                            src={`${process.env.PUBLIC_URL}/Assets/PartThreeImgs/mivneParlag.png`}
                            alt="mivneParlag"
                            className='mivneParlag'
                        />
                    </div>
                )}
            </div>

            <div className="buttons-bar-CardParlag">
                <div className="btn-text btn-text-prev">
                    {step === 2 && (
                        <div onClick={handleBack}>
                            <div className="img-arrow img-arrow-prev" />
                            <div className="text-label">חזור</div>
                        </div>
                    )}
                </div>

                <div className="btn-text btn-text-next">
                    {step === 1 && (
                        <div onClick={handleNext}>
                            <div className="img-arrow img-arrow-next" />
                            <div className="text-label">הבא</div>
                        </div>
                    )}
                    {step === 2 && (
                        <div className="btn-text btn-text-end" onClick={onCloseCard}>
                            <div className="img-arrow img-arrow-end" />
                            <div className="text-label">סיום</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CardParlag;
