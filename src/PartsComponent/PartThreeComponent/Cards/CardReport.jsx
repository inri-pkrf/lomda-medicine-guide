import React, { useState } from 'react';
import '../styles/CardReport.css';

const CardReport = ({ onCloseCard }) => {

    return (
        <div className="CardReport">
            <img
                src={`${process.env.PUBLIC_URL}/Assets/PartThreeImgs/phone.png`}
                alt="phone"
                className="img-card-phone"
            />
            <div className='title-card'>
                שיטת הדיווח:
            </div>
            <img
                src={`${process.env.PUBLIC_URL}/Assets/PartThreeImgs/divuachSystem.PNG`}
                alt="divuachSystem"
                className='divuachSystem'
            />
            <div className="buttons-bar-CardReport">
                <div className="btn-text btn-text-end" onClick={onCloseCard}>
                    <div className="img-arrow img-arrow-end" />
                    <div className="text-label">סיום</div>
                </div>
            </div>
        </div>
    );
};

export default CardReport;