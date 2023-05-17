import React from 'react';

// components
import AdminNavbar from "../../components/admin/AdminNavbar";

// styles
import '../../sass/style.scss'

const AdminProducts = () => {
    return (
        <div className="admin__container">
            <AdminNavbar/>
            <div className="admin-products"></div>
            <h1>Produkter</h1>
            <p>Här listas era nuvarande produkter</p>
        </div>
    )
}

export default AdminProducts