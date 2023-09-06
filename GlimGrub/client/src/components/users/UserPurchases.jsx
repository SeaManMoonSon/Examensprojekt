import { useEffect, useState } from "react";
import React from "react";
import { useParams } from "react-router-dom";
import URL from "../../proxyURL.js";

// components
import UserBalance from "../../components/users/UserBalance";
import AdminNavbar from "../../components/admin/AdminNavbar";

// styles
import "../../sass/style.scss";

const UserPurchases = (props) => {
    const { id } = useParams();

    const [user, setUser] = useState(null);
    const [purchases, setPurchases] = useState(null);
    const [editedPassword, setEditedPassword] = useState("");
    const [editedBalance, setEditedBalance] = useState("");
    const [newBalance, setNewBalance] = useState(false);
    // const [popupSaldo, setPopupSaldo] = useState(false);

    const fetchUser = async () => {
        try {
            const response = await fetch(`${URL}/api/users/${id}`);

            console.log("Response status:", response.status);

            if (!response.ok) {
                throw new Error("User not found");
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

            console.log("Response status:", response.status);

            if (!response.ok) {
                throw new Error("User not found");
            }

            const json = await response.json();
            setPurchases(json);

            console.log("json:", json);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchPayments();
    }, [id]);


    return (
        <div>
            <div>
                <p>Dina tidigare köp</p>
            </div>
            <ul>
                {purchases &&
                    purchases.map((purchase) => (
                        <div className="admin__show-users_list" key={purchase._id}>
                            <p>{purchase.date.split("T")[0]}</p>
                            <p>
                                <b>
                                    {JSON.stringify(purchase.user_id.name).replace(/\"/g, "")}
                                </b>{" "}handlade för totalt <b>{purchase.price_total} kr</b>
                            </p>
                        </div>
                    ))}
            </ul>
        </div>
    );
};

export default UserPurchases;
