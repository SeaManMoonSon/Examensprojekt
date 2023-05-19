import React from 'react';

// components
import Logout from "../../components/misc/Logout";
import AdminSearchBar from '../../components/admin/AdminSearchBar'
import AdminSearchResultList from '../../components/admin/AdminSearchResultList'

import { useEffect, useState } from "react"


// styles
import '../../sass/style.scss'

const AdminNavigation = () => {

    const [results, setResults] = useState([]);

    return (
        <div className="navbar__container">
            <nav>
                <ul>
                    <li><a href="/admin/landing">Start</a></li>

                    <div className="admin__searchbar-container">
                        <AdminSearchBar setResults={setResults} />
                        <div className="admin__searchbar-result">
                            <AdminSearchResultList results={results} />
                        </div>
                    </div>

                    <li><a href="/admin/products">Produkter</a></li>
                    {/* <li><a href="/admin/users">Användare</a></li> */}
                    <li><Logout /></li>
                </ul>
            </nav>
        </div>
    )
}

export default AdminNavigation