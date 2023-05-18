import React from 'react';
import { useEffect, useState } from "react"
import URL from "../../proxyURL.js";

// components
import Logout from "../../components/misc/Logout";
import AdminNavbar from "../../components/admin/AdminNavbar";
import { useAuthContext, userAuthContext } from "../../hooks/userAuthContext";

// styles
import '../../sass/style.scss'

const Users = () => {
    // const { user } = useAuthContext();

    const [users, setUsers] = useState(null)

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch(`${URL}/api/users`);
            const json = await response.json()

            if (response.ok) {
                setUsers(json)
            }
        }

        fetchUsers()
    }, [])

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
                <ul>
                    {/* {users.users.name} */}

                    {users && (
                        <>
                            {users.map((user) => {
                                return <div className="admin__show-users_list" key={user._id}>
                                    <p>{user.name}</p>
                                    <p>{user.balance}</p>
                                    <div className="admin__show-users_list-balance"><button>Redigera saldo</button></div>
                                </div>;
                            })}
                        </>
                    )}


                    {/* <div className="admin__show-users_list"><p>Simon Månsson</p><div className="admin__show-users_list-balance"><button>Redigera saldo</button></div></div> */}
                    {/* <div className="admin__show-users_list"><p>Veronica Selenwall</p><div className="admin__show-users_list-balance"><button>Redigera saldo</button></div></div> */}
                </ul>
            </div>
        </div>
    )
}

export default Users