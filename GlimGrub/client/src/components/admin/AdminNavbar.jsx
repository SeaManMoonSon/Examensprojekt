import React, { useState } from 'react';

// components
// import Logout from "../../components/misc/Logout";
import AdminLogout from '../../components/admin/AdminLogout';
import AdminSearchBar from '../../components/admin/AdminSearchBar';
import AdminSearchResultList from '../../components/admin/AdminSearchResultList';

// styles
import '../../sass/style.scss'

const AdminNavigation = () => {

    const [results, setResults] = useState([]);
    const [toggleMenu, setToggleMenu] = useState(false);

    const handleMenu = () => {
        setToggleMenu((prevState) => !prevState);
    }

    const handleMenuClose = () => {
        setToggleMenu(false);
    }

    return (
        <div className="navbar__container">
            <nav>
                <div><a href="/admin/landing"><i className="fa-sharp fa-solid fa-house"></i></a></div>

                <div className="admin__searchbar-container">
                    <AdminSearchBar setResults={setResults} />
                    <div className="admin__searchbar-result">
                        <AdminSearchResultList results={results} />
                    </div>
                </div>

                <div><button onClick={handleMenu}><i className="fa-solid fa-bars"></i></button></div>

                {toggleMenu && (
                    <>
                        <div className="navbar__toggle-menu">

                            <div className="navbar__toggle-menu_close">
                                <button onClick={handleMenuClose}><i className="fa-solid fa-xmark"></i></button>
                            </div>

                            <div className="navbar__toggle-menu_items">
                            {/* <div className="overlay"></div> */}
                                <div><a href="/admin/products">Produkter</a></div>
                                <div><AdminLogout/></div>
                            </div>

                        </div>
                    </>

                )}
            </nav>
        </div>
    )
}

export default AdminNavigation