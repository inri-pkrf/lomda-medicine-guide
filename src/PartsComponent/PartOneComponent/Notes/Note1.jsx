import React from 'react';
import '../styles/Note1.css';


const Note1 = ({ onClose }) => {
    return (
        <div className="Note1">
            <img
                src={`${process.env.PUBLIC_URL}/Assets/PartOneImgs/Notes/note1/tape1.png`}
                alt="tape1"
                className='tapes tape1'
            />
            <div className='title-notes'>
                ייעוד פקע"ר
            </div>

            <div className='hats-containr'>

                <div className='blue-div'>
                    <div className='hat-title blue-title'>
                        ראש הג"א
                    </div>
                    <img
                        src={`${process.env.PUBLIC_URL}/Assets/PartOneImgs/Notes/note1/blueHat.png`}
                        alt="blueHat"
                        className="htsImgs blueHat"
                    />
                    <div className='hat-subText blue-subText'>
                        שירות ההתגוננות האזרחית כהגדרתו בחוק
                    </div>
                </div>

                <div className='green-div'>
                    <div className='hat-title green-title'>
                        פקמ"ר
                    </div>
                    <img
                        src={`${process.env.PUBLIC_URL}/Assets/PartOneImgs/Notes/note1/greenHat.png`}
                        alt="greenHat"
                        className="htsImgs greenHat"
                    />
                    <div className='hat-subText green-subText'>
                        פיקוד מרחבי
                    </div>
                </div>

                <div className='orange-div'>
                    <div className='hat-title orange-title'>
                        קצין חיל ראשי
                    </div>
                    <img
                        src={`${process.env.PUBLIC_URL}/Assets/PartOneImgs/Notes/note1/orangeHat.png`}
                        alt="orangeHat"
                        className="htsImgs orangeHat"
                    />
                    <div className='hat-subText orange-subText'>
                        סמכות מקצועית ראשית בנושאי ההתגוננות האזרחית, החילוץ וההצלה
                    </div>
                </div>
            </div>

            <div className="buttons-bar-note1">
                <div className="btn-text btn-text-end" onClick={onClose}>
                    <div className="img-arrow img-arrow-end" />
                    <div className="text-label">סיום</div>
                </div>
            </div>

        </div>
    );
};

export default Note1;
