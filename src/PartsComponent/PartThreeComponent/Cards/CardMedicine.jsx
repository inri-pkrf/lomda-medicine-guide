import React, { useState } from 'react';
import '../styles/CardMedicine.css';

const CardMedicine = ({ onCloseCard }) => {
    return (
        <div className="CardMedicine">

            <img
                src={`${process.env.PUBLIC_URL}/Assets/PartThreeImgs/case.png`}
                alt="case"
                className="img-card-case"
            />

            <div className='title-card'>
                שיטת הרפואה:
            </div>

            <img
                src={`${process.env.PUBLIC_URL}/Assets/PartThreeImgs/refuaSystem.PNG`}
                alt="refuaSystem"
                className='refuaSystem'
            />

            <div className="buttons-bar-CardMedicine">
                <div className="btn-text btn-text-end" onClick={onCloseCard}>
                    <div className="img-arrow img-arrow-end" />
                    <div className="text-label">סיום</div>
                </div>
            </div>
        </div>
    );
};

export default CardMedicine;