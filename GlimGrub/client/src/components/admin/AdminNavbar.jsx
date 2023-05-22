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
                
                    <div><a href="/admin/landing">Start</a></div>

                    <div className="admin__searchbar-container">
                        <AdminSearchBar setResults={setResults} />
                        <div className="admin__searchbar-result">
                            <AdminSearchResultList results={results} />
                        </div>
                    </div>
                    
                    <div><a href="/admin/products">Produkter</a></div>
                    {/* <li><a href="/admin/users">Användare</a></li> */}
                    <div><Logout /></div>
                
            </nav>
        </div>
    )
}

export default AdminNavigation