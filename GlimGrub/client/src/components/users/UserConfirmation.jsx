import React, { useState } from 'react';
import { useAuthContext } from '../../hooks/userAuthContext';
import Logout from '../misc/Logout'

// styles

const UserConfirmation = () => {
    const [confirmed, setConfirmed] = useState(false);
    // const { product } = 

    const handleConfirmation = () => {
        setConfirmed(true);
    }

    return (

        <div className="user-confirmation__container">

            {!confirmed && (
                <div>
                    <div className="user-confirmation__container-text">
                        <h2 className="user-confirmation__heading">Vänligen bekräfta ditt val</h2>
                        <div className="user-confirmation__product">Icon and choosen product</div>
                    </div>
                    <div className="user-confirmation__buttons">
                        <button>Avbryt</button>
                        <button onClick={handleConfirmation}>Ok</button>
                    </div>
                </div>
            )}

            {confirmed && (
                <div>
                    <div className="user-confirmation__container-text">
                        <h2 className="user-confirmation__heading">Tack för din beställning</h2>
                        <div className="user-confirmation__product">Du loggas automatiskt ut om: 00</div>
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