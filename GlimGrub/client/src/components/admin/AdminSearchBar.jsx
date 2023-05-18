import React from 'react';
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react"
import URL from "../../proxyURL.js";


// styles
import '../../sass/style.scss'

const AdminSearchBar = ({ setResults }) => {

    const [input, setInput] = useState("");
    // const [users, setUsers] = useState(null)


    const fetchUsers = (value) => {
        fetch(`${URL}/api/users`)
            .then((response) => response.json())
            .then((json) => {
                const results = json.filter((user) => {
                    return (
                        value && 
                        user && 
                        user.name && 
                        user.name.toLowerCase().includes(value.toLowerCase())
                    );
                });
                setResults(results);
                console.log(results);
            });
    };




    const handleChange = (value) => {
        setInput(value)
        fetchUsers(value)
    }


    return (
        <div className="admin__searchbar-container">
            <FaSearch id="search-icon" />
            <input
                value={input}
                onChange={(e) => handleChange(e.target.value)}
                placeholder="Sök..."
            />
        </div>
    )
}

export default AdminSearchBar