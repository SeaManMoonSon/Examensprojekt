import React from 'react';

// components
import AdminNavbar from "../../components/admin/AdminNavbar";

// styles
import '../../sass/style.scss'

const AdminDashboard = () => {
    return (
        <div className="admin__container">
            <AdminNavbar/>
            <div className="admin-dashboard__info-text">
            <h1>Aktuellt flöde</h1>
            <p>Just nu finns det inte något aktivt flöde.</p>
            <div className="admin-dashboard__info-btn">
                <button>Starta</button>
            </div>
            </div>
        </div>
    )
}

export default AdminDashboard