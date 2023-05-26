import React, { useState } from 'react';
import dateFormat from 'dateformat';

// components
import AdminNavbar from "../../components/admin/AdminNavbar";
import ListUsers from "../../components/misc/ListUsers";
import URL from "../../proxyURL.js";


// styles
import '../../sass/style.scss'

const AdminDashboard = () => {
    const [popUp, setPopUp] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleClearFeed = () => {
        console.log("Im triggered");
    }

    const handleExport = () => {

        setPopUp(true);
    }

    const handleSubmit = () => {

        const formattedStartDate = dateFormat(startDate, "yyyy-mm-dd");
        const formattedEndDate = dateFormat(endDate, "yyyy-mm-dd");

        setStartDate(formattedStartDate);
        setEndDate(formattedEndDate);

        console.log('Formatted Startdate: ', formattedStartDate);
        console.log('Formatted Enddate: ', formattedEndDate);
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
                <ListUsers />

                <div className="categories__container">
                    {popUp && (
                        <div className="popup__wrap">
                            <div className="popup__overlay"></div>
                            <div className="popup__container">

                                <h2>Exportera betalningar</h2>

                                <form action={`${URL}/api/purchases/export`} method="POST">
                                    <label htmlFor="startDate">Startdatum: </label>
                                    <input
                                        type="date"
                                        name="startDate"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        required />

                                    <label htmlFor="endDate">Slutdatum: </label>
                                    <input
                                        type="date"
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