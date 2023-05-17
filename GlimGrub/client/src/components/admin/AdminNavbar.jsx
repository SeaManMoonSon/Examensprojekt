import React from 'react';

// components
import Logout from "../../components/misc/Logout";

// styles
import '../../sass/style.scss'

const AdminNavigation = () => {
    return (
        <div className="navbar__container">
            <nav>
                <ul>
                    <li><a href="/admin/landing">Start</a></li>
                    <li><a href="/admin/products">Produkter</a></li>
                    <li><a href="/admin/users">Användare</a></li>
                    <li><Logout/></li>
                </ul>
            </nav>
        </div>
    )
}

export default AdminNavigation