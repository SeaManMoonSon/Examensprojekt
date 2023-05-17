import React from 'react';

// components
import Logout from "../../components/misc/Logout";
import AdminNavbar from "../../components/admin/AdminNavbar";

// styles
import '../../sass/style.scss'

const Users = () => {
    return (
        <div className="admin__container">
            <AdminNavbar />
            <div className="admin__info-text">
                <h1>Användare</h1>
            </div>
            <div className="admin__user-btns">
                <button>Personal</button>
                <button>Deltagare</button>
            </div>
            <div className="admin__show-users">
                <p>Här kommer personal/deltagare listas via en component</p>
                <ul>
                    <div className="admin__show-users_list"><p>Simon Månsson</p><div className="admin__show-users_list-balance"><button>Redigera saldo</button></div></div>
                    <div className="admin__show-users_list"><p>Veronica Selenwall</p><div className="admin__show-users_list-balance"><button>Redigera saldo</button></div></div>
                </ul>
            </div>
        </div>
    )
}

export default Users