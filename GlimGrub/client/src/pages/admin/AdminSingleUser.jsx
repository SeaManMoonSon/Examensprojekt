import { useEffect, useState } from "react"
import React from 'react';
import { useParams } from 'react-router-dom';
import URL from "../../proxyURL.js";


// components
import UserBalance from "../../components/users/UserBalance";
import AdminNavbar from "../../components/admin/AdminNavbar";
// import AdminPurchase from '../../components/admin/AdminPurchase'

// styles
import '../../sass/style.scss'

const AdminSingleUser = (props) => {

    const { id } = useParams();

    const [user, setUser] = useState(null);
    const [purchases, setPurchases] = useState(null);
    const [editedBalance, setEditedBalance] = useState('');
    const [newBalance, setNewBalance] = useState(false);
    // const [popupSaldo, setPopupSaldo] = useState(false);

    const fetchUser = async () => {
        try {
            const response = await fetch(`${URL}/api/users/${id}`);

            console.log('Response status:', response.status);

            if (!response.ok) {
                throw new Error('User not found');
            }

            const data = await response.json();
            setUser(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchUser();
    }, [URL, id]);


    const fetchPayments = async () => {
        try {
            const response = await fetch(`${URL}/api/purchases/${id}`);

            console.log('Response status:', response.status);


            if (!response.ok) {
                throw new Error('User not found');
            }

            const json = await response.json();
            setPurchases(json);

            console.log('json:', json);

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchPayments();
    }, [id]);


    const editBalance = async () => {

        const editBalanceObj = {
            balance: editedBalance
        };

        try {
            const response = await fetch(`${URL}/api/users/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editBalanceObj),
            });

            if (response.ok) {
                console.log('Saldot är uppdaterat!');
                setEditedBalance(null);

                fetchUser();
                fetchPayments();
            } else {
                console.error('Tyvärr gick det inte att uppdatera saldot, försök igen.');
            }
        } catch (error) {
            console.error('Det blev ett litet fel: ', error);
        }

        setNewBalance(false);
    };

    if (!user) {
        return <div>No user found</div>;
    }

    const handleEditBalance = () => {
        setNewBalance(true);
    }

    // const handleEditBalanceDismiss = () => {
    //     setPopupSaldo(false);
    // }

    return (
        <div className="single-user__container">
            <AdminNavbar />

            <div className="single-user__info">
                <h2>{user.name}</h2>
                <h3>{user.role}</h3>
            </div>

            <div className="single-user__balance-purcased_wrap">
                <div className="single-user__balance">
                    <div className="balance-container">
                        <div className="balance__balance">
                            <div className="balance__icon">
                                <i class="fa-solid fa-money-check-dollar"></i>
                            </div>
                            <div>
                                <h2>{user.balance} sek</h2>
                            </div>
                            <h3>Kvar av saldo</h3>
                            <button onClick={handleEditBalance}>Redigera saldo</button>
                        </div>
                    </div>

                    {newBalance && (
                        <div className="popup__wrap">
                            <div className="overlay">
                                <div className="popup__balance-container">
                                    <div className="popup__balance">
                                    <button onClick={() => setNewBalance(false)} className="popup__close"><i className="fa-solid fa-xmark"></i></button>
                                        <div className="popup__balance-info">
                                        <h2>Redigera saldo</h2>
                                        <h3>{user.name} | {user.role}</h3>
                                        <input
                                            type="number"
                                            value={editedBalance}
                                            placeholder={user.balance}
                                            onChange={(e) => setEditedBalance(e.target.value)}
                                        />
                                        <button onClick={editBalance}>Spara saldo</button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    )}


                </div>

                <div className="single-user__purchased">
                    <h4>Senaste köpen</h4>
                    <ul>
                        {purchases &&
                            purchases.map((purchase) => {
                                return <div className="admin__show-users_list" key={purchase._id}>
                                    <p>{purchase.date.split("T")[0]}</p>
                                    <p><b>{JSON.stringify(purchase.user_id.name).replace(/\"/g, "")}</b> handlade för totalt <b>{purchase.price_total} kr</b></p>
                                </div>;
                            })}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AdminSingleUser;
