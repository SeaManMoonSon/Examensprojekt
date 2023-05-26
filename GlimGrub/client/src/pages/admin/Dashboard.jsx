import React, { useState } from 'react';
import dateFormat from "dateformat";

// components
import AdminNavbar from "../../components/admin/AdminNavbar";
import ListUsers from "../../components/misc/ListUsers";

// styles
import '../../sass/style.scss'

const AdminDashboard = () => {
    const [lastClear, setLastClear] = useState(null);

    const handleClearFeed = () => {
        // ----------------- LIVE CODE ------------------------------------------
        // const timestamp = new Date();
        // const formattedTimestamp = dateFormat(timestamp, "isoDateTime");
        // setLastClear(formattedTimestamp);
        // console.log("Im triggered", formattedTimestamp);

        // --------------- TEST/DEV ---------------------------------------------
        const test = "2023-05-24T16:56:12+0200";
        setLastClear(test);
        console.log("Im triggered", test);
    }

    return (
        <div className="admin__container-start">
            <AdminNavbar />
            <div className="admin__dashboard-info">
                <div className="admin__dashboard-info_text">
                    <h2>Köp</h2>
                </div>
                <div className="admin__dashboard-info_btn">
                    <button onClick={handleClearFeed}>Rensa flöde</button>
                </div>
            </div>
            <div className="admin__dashboard-users_payflow">
                <ListUsers lastClear={lastClear}/>
            </div>
        </div>
    )
}

export default AdminDashboard