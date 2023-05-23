// import React from 'react';
// import { useEffect, useState } from "react"
// import URL from "../../proxyURL.js";

// // styles

// const AdminPurchase = () => {

//     const [purchases, setPurchases] = useState(null)

//     useEffect(() => {
//         const fetchUsers = async () => {
//             const response = await fetch(`${URL}/api/purchases`);
//             const json = await response.json()

//             if (response.ok) {
//                 setPurchases(json)
//                 console.log("json", json);
//             }
//         }

//         fetchUsers()
//     }, [])

//     return (
//         <div>
//             <h4>Senaste köpen</h4>
//             <ul>
//                 {purchases &&
//                     purchases.map((purchase) => {
//                         return <div className="admin__show-users_list" key={purchase._id}>
//                             <p>{purchase.date}</p>
//                             <p>{JSON.stringify(purchase.user_id.name).replace(/\"/g, "")} handlade för totalt {purchase.price_total} kr</p>
//                         </div>;
//                     })}
//             </ul>
//         </div>
//     )
// }

// export default AdminPurchase