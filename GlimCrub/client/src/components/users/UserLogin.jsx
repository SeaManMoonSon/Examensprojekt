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
            <form action="/api/users/login" method="POST">
                
            <SSNInput />
            <input type="password" maxLength={4} minLength={4} placeholder="PIN"/>

            
                <input onSubmit={console.log()} type="submit" value="Log in" />
                {/* <button>Log in</button> */}
            
            </form>
        </div>
    )
}

export default UserLogin