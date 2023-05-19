import React from 'react';

// components
import AdminNavbar from "../../components/admin/AdminNavbar";
import ListUsers from "../../components/misc/ListUsers";

// styles
import '../../sass/style.scss'

const AdminDashboard = () => {
    return (
        <div className="admin__container-start">
            <AdminNavbar />
            <div className="admin__dashboard-info">
                <div className="admin__dashboard-info_text">
                    <h2>Köp</h2>
                </div>
                <div className="admin__dashboard-info_btn">
                    <button>Rensa flöde</button>
                </div>
            </div>
            <div className="admin__dashboard-users_payflow">
                <ListUsers />
            </div>
        </div>
    )
}

export default AdminDashboard