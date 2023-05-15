import React from 'react';
import { Link } from 'react-router-dom';
import { useLogout } from '../../hooks/useLogout';

// styles
import '../../sass/style.scss'

const Logout = () => {
    const { logout } = useLogout()

    const handleClick = () => {
        logout()
    }

    return (
        <div className="logout-container">
            <button onClick={handleClick}>Logga ut</button>
        </div>
    )
}

export default Logout