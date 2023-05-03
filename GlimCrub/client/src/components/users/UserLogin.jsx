import React from 'react';
import { Link } from 'react-router-dom';

// components
import SSNInput from '../../components/misc/SSNI'

// styles

const UserLogin = () => {
    return (
        <div>
            <h1>Welcome</h1>
            <h2>Log in here</h2>
            
            <SSNInput />
            <input type="password" maxLength={4} minLength={4} placeholder="PIN"/>

            <Link to="/landing">
                <button>Log in</button>
            </Link>
        </div>
    )
}

export default UserLogin