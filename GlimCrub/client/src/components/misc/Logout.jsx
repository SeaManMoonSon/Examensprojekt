import React from 'react';
import { Link } from 'react-router-dom';

// styles

const Logout = () => {
    return (
        <div className="logout-container">
            <Link to="/"><button>Logout</button></Link>
        </div>
    )
}

export default Logout