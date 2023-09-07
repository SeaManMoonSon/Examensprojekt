import { useEffect, useState } from "react";
import React from "react";
import URL from "../../proxyURL.js";

// styles
import "../../sass/style.scss";

const UserPurchases = (props) => {
  const userID = props.user.user._id;

  const [purchases, setPurchases] = useState(null);

  const fetchPayments = async () => {
    try {
      const response = await fetch(`${URL}/api/purchases/${userID}`);

      // console.log("Response status:", response.status);

      if (!response.ok) {
        throw new Error("User not found");
      }

      const json = await response.json();
      setPurchases(json);

      // console.log("json:", json);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [userID]);

  console.log("USER INFO: ", props.user.user);
  // console.log("PURCHASES INFO: ", purchases);

  return (
    <div>
      <div>
        <p>Dina tidigare köp</p>
      </div>
      <ul>
        {purchases &&
          purchases.map((purchase) => (
            <div className="user__show-purchases-list" key={purchase._id}>
              <p>
                {purchase.date.split("T")[0]}{" "}
                {purchase.date.split("T")[1].split("+")[0]}
              </p>
              <p>
                Handlade du för <b>{purchase.price_total} kr</b>
              </p>
            </div>
          ))}
      </ul>
    </div>
  );
};

export default UserPurchases;
