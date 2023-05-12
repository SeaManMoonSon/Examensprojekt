import React from 'react';
import { useAuthContext } from "../../hooks/userAuthContext";

// styles

const UserBalance = () => {
    const { user } = useAuthContext();

    return (
        <div className="balance-container">
            <div className="balance__img">Wallet img</div>
            <div className="balance__balance">
                {user && (
                    <div>
                        <h2>{user.user.balance}</h2>
                    </div>
                )}
            </div>
        </div>
    )
}

export default UserBalance