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
    const [reset, setReset] = useState(false);
    const [isLoading, setIsLoading] = useState(null);

    const handleClearFeed = async () => {
        // ----------------- LIVE CODE ------------------------------------------
        // const timestamp = new Date();
        // const formattedTimestamp = dateFormat(timestamp, "isoDateTime");
        // setLastClear(formattedTimestamp);
        // console.log("Im triggered", formattedTimestamp);

        // --------------- TEST/DEV ---------------------------------------------
        // const test = "2023-05-24T16:56:12+0200";
        // setLastClear(test);
        // console.log("Im triggered", test);

        // --------------- DATABASE TIMESTAMP -----------------------------------
        try {
            const response = await fetch(`${URL}/api/clearfeed`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            if (response.status === 200) {
                setReset(false);
                setIsLoading(true);
            }

            setInterval(() => {
                setIsLoading(false);
                // window.location.reload();
            }, 10000);
        } catch (error) {
            console.error(error.message);
        }
    }

    const handleExport = () => {
        setPopUp(true);
    }

    const handleExportClose = () => {
        setPopUp(false);
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
                    <h2>Senaste köpen</h2>
                </div>
                <div className="admin__dashboard-info_btn">
                    <button onClick={handleExport}><i class="fa-solid fa-download"></i></button>
                    <button onClick={() => setReset(true)}><i class="fa-solid fa-rotate-right"></i>Rensa flöde</button>
                </div>
            </div>

            <div className="admin__dashboard-users_payflow">
            {isLoading && (
            <div className="list-users__loading">
              <div className="list-users__loading-progress">
              </div>
              <div className="overlay loading-overlay"></div>
              <p>Flödet uppdateras...</p>
            </div>
          )}

                <ListUsers lastClear={lastClear} />
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
                                                type="datetime-local"
                                                name="startDate"
                                                value={startDate}
                                                onChange={(e) => setStartDate(e.target.value)}
                                                required />

                                            <div className="popup__form-arrow"><i class="fa-solid fa-arrow-right"></i></div>

                                            {/* <label htmlFor="endDate"><p>Till</p></label> */}
                                            <input
                                                type="datetime-local"
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
                    {reset && (
                        <div className="popup__wrap">
                            <div className="popup__overlay">
                                <div className="popup__container">
                                    <button onClick={() => setReset(false)} className="popup__close"><i className="fa-solid fa-xmark"></i></button> 
                                    <div className="popup__info">
                                    <h2>Är du säker på att du vill återställa flödet?</h2>
                                    <button onClick={handleClearFeed} className="popup__form-submit submit-yes" value="">Ja</button>
                                    <button onClick={() => setReset(false)} className="popup__form-submit" value="">Nej</button>
                                    </div>
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