import React from 'react';
import { useEffect, useState } from "react"
import URL from "../../proxyURL.js";

// components
import Logout from "../../components/misc/Logout";
import AdminNavbar from "../../components/admin/AdminNavbar";
import { useAuthContext, userAuthContext } from "../../hooks/userAuthContext";
import { AdminSearchBar, AdminSearchResultList } from '../../components';

// styles
import '../../sass/style.scss'

const Users = () => {
    // const { user } = useAuthContext();

    const [users, setUsers] = useState(null)
    const [filteredUsers, setFilteredUsers] = useState(null);
    const [results, setResults] = useState([]);

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


    // const handleStaff = () => {
    //     console.log("Personal");

    //     const filterStaff = users.filter((user) => user.role === "personal")
       
    //     setFilteredUsers(filterStaff);

    //     console.log(filterStaff);
    // }

    // const handleParticipants = () => {
    //     console.log("Användare")

    //     const filterParticipants = users.filter((user) => user.role === "deltagare")

    //     setFilteredUsers(filterParticipants);
       
    //     console.log(filterParticipants);
    // }

    // const handleShowAllUsers = () => {
    //     setFilteredUsers(null); // 
    //   };

    useEffect(() => {
        // Show all users by default
        setFilteredUsers(users);
      }, [users]);

    return (
        <div className="admin__container">
            <AdminNavbar />
            <div className="admin__info-text">
                <h1>Användare</h1>
            </div>

            <div className="admin__searchbar-container">
                <AdminSearchBar setResults={setResults} />
                <div className="admin__searchbar-result">
                <AdminSearchResultList results={results}/>
                </div>
            </div>

            <div className="admin__user-btns">
                {/* <button onClick={handleStaff}>Personal</button>
                <button onClick={handleParticipants}>Deltagare</button> */}
                {/* <button onClick={handleShowAllUsers}>Visa alla</button> */}

            </div>
            <div className="admin__show-users">
                <ul>
                    {/* {users.users.name} */}

                    {filteredUsers && 
                        
                            filteredUsers.map((user) => {
                                return <div className="admin__show-users_list" key={user._id}>
                                    <p>{user.name}</p>
                                    <p>{user.balance}</p>
                                    <div className="admin__show-users_list-balance"><button>Redigera saldo</button></div>
                                </div>;
                            })}

                    {/* <div className="admin__show-users_list"><p>Simon Månsson</p><div className="admin__show-users_list-balance"><button>Redigera saldo</button></div></div> */}
                    {/* <div className="admin__show-users_list"><p>Veronica Selenwall</p><div className="admin__show-users_list-balance"><button>Redigera saldo</button></div></div> */}
                </ul>
            </div>
        </div>
    )
}

export default Users