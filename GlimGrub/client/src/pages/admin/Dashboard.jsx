import React, { useState } from 'react';
import dateFormat from "dateformat";

// components
import AdminNavbar from "../../components/admin/AdminNavbar";
import ListUsers from "../../components/misc/ListUsers";
import URL from "../../proxyURL.js";


// styles
import '../../sass/style.scss'

const AdminDashboard = () => {
    const [lastClear, setLastClear] = useState(null);
    const [popUp, setPopUp] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleClearFeed = () => {
        // ----------------- LIVE CODE ------------------------------------------
        const timestamp = new Date();
        const formattedTimestamp = dateFormat(timestamp, "isoDateTime");
        setLastClear(formattedTimestamp);
        console.log("Im triggered", formattedTimestamp);

        // --------------- TEST/DEV ---------------------------------------------
        // const test = "2023-05-24T16:56:12+0200";
        // setLastClear(test);
        // console.log("Im triggered", test);
    }

    const handleExport = () => {

        setPopUp(true);
    }

    const handleSubmit = () => {

        setStartDate(startDate);
        setEndDate(endDate);

        console.log(startDate);
        console.log(endDate);
    }

    return (
        <div className="admin__container-start">
            <AdminNavbar />
            <div className="admin__dashboard-info">
                <div className="admin__dashboard-info_text">
                    <h2>Köp</h2>
                </div>
                <div className="admin__dashboard-info_btn">
                    <button onClick={handleExport}>Export</button>
                    <button onClick={handleClearFeed}>Rensa flöde</button>
                </div>
            </div>

            <div className="admin__dashboard-users_payflow">
                <ListUsers lastClear={lastClear}/>
                <div className="categories__container">
                    {popUp && (
                        <div className="popup__wrap">
                            <div className="popup__overlay"></div>
                            <div className="popup__container">

                                <h2>Exportera betalningar</h2>

                                <form action={`${URL}/api/purchases/export`} method="POST">
                                    <label htmlFor="startDate">Startdatum: </label>
                                    <input
                                        type="datetime-local"
                                        name="startDate"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        required />

                                    <label htmlFor="endDate">Slutdatum: </label>
                                    <input
                                        type="datetime-local"
                                        name="endDate"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        required />

                                    <input type="submit" value="Ladda ner" onClick={handleSubmit}/>
                                </form>

                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard