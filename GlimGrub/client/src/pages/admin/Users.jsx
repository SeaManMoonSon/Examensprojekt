import React from 'react';

// components
import Logout from "../../components/misc/Logout";
import AdminNavbar from "../../components/admin/AdminNavbar";

// styles
import '../../sass/style.scss'

const Users = () => {
    return (
        <div className="admin__container">
            <AdminNavbar/>
            <h1>Användare</h1>
        </div>
    )
}

export default Users