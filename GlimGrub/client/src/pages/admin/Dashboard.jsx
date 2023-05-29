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

    const handleExportClose = () => {
        setPopUp(false);
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
                    <h2>Senaste köpen</h2>
                </div>
                <div className="admin__dashboard-info_btn">
                    <button onClick={handleExport}><i class="fa-solid fa-download"></i></button>
                    <button onClick={handleClearFeed}><i class="fa-solid fa-rotate-right"></i>Rensa flöde</button>
                </div>
            </div>

            <div className="admin__dashboard-users_payflow">
                <ListUsers />

                <div className="categories__container">
                    {popUp && (
                        <div className="popup__wrap">
                            <div className="popup__overlay">
                                <div className="popup__container">

                                    <button onClick={handleExportClose} className="popup__close"><i className="fa-solid fa-xmark"></i></button>
                                    <h2>Exportera betalningar</h2>

                                    <form action={`${URL}/api/purchases/export`} method="POST">
                                        <div className="popup__form-date">
                                            {/* <label htmlFor="startDate"><p>Från</p></label> */}
                                            <input
                                                type="date"
                                                name="startDate"
                                                value={startDate}
                                                onChange={(e) => setStartDate(e.target.value)}
                                                required />

                                            <div className="popup__form-arrow"><i class="fa-solid fa-arrow-right"></i></div>

                                            {/* <label htmlFor="endDate"><p>Till</p></label> */}
                                            <input
                                                type="date"
                                                name="endDate"
                                                value={endDate}
                                                onChange={(e) => setEndDate(e.target.value)}
                                                required />
                                        </div>

                                        <input type="submit" className="popup__form-submit" value="Ladda ner" onClick={handleSubmit} />
                                    </form>

                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard