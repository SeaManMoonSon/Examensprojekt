import React, { useState } from 'react';
import { useAuthContext } from '../../hooks/userAuthContext';
import Logout from '../misc/Logout';
import { useNavigate } from 'react-router-dom';

// styles
import '../../sass/style.scss'

const UserConfirmation = () => {
    const [confirmed, setConfirmed] = useState(false);
    const navigate = useNavigate();

    const handleConfirmation = () => {
        setConfirmed(true);
    }

    const handleEscape = () => {
        navigate('/landing');
    }


    return (

        <div className="user-confirmation__container">

            {!confirmed && (
                <div>
                    <div className="user-confirmation__container-text">
                        <h2>Vänligen bekräfta ditt val</h2>
                        <div className="user-confirmation__product">
                            <i className="fa-solid fa-utensils"></i>
                            <div className="user-confirmation__product-item">Lunch</div>
                        </div>
                    </div>
                    <div className="user-confirmation__buttons">
                        <button className="user-confirmation__buttons-escape" onClick={handleEscape}>Avbryt</button>
                        <button className="user-confirmation__buttons-ok" onClick={handleConfirmation}><p>Ok</p></button>
                    </div>
                </div>
            )}

            {confirmed && (
                <div>
                    <div className="user-confirmation__container-text">
                        <h2>Tack för din beställning</h2>
                        <div className="user-confirmation__timer">Du loggas automatiskt ut om: 00</div>
                    </div>
                    <div className="user-confirmation__buttons">
                        <Logout />
                    </div>
                </div>
            )}

        </div>
    )
}

export default UserConfirmation