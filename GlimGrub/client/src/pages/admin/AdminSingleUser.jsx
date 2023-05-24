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

    useEffect(() => {
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

        fetchUser();
    }, [URL, id]);



    useEffect(() => {
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

        }

        fetchPayments()
    }, [id])


    if (!user) {
        return <div>No user found</div>;
    }

    return (
        <div className="single-user__container">
            <AdminNavbar />

            <div className="single-user__info">
                <h2>{user.name}</h2>
                <h3>{user.role}</h3>
            </div>

            <div className="single-user__balance">
                {/* <UserBalance/> */}
                {user.balance}
            </div>

            <div className="single-user__purchased">
                {/* <AdminPurchase /> */}

                <h4>Senaste köpen</h4>
                <ul>
                    {purchases &&
                        purchases.map((purchase) => {
                            return <div className="admin__show-users_list" key={purchase._id}>
                                <p>{purchase.date}</p>
                                <p>{JSON.stringify(purchase.user_id.name).replace(/\"/g, "")} handlade för totalt {purchase.price_total} kr</p>
                            </div>;
                        })}
                </ul>
            </div>



            {/* <h2>{user.name}</h2>
      <h3>{user.role}</h3>

      <p>{user.balance}</p>

      Render other user details */}
        </div>
    );
};

export default AdminSingleUser;
