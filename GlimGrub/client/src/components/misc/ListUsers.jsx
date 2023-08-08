import React from "react";
import { useEffect, useState } from "react";
import URL from "../../proxyURL.js";
import dateFormat from "dateformat";

// styles

const ListUsers = ({ lastClear }) => {
  const [purchases, setPurchases] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(`${URL}/api/purchases`);
      const json = await response.json();

      console.log("Retrieved data:", json);

      if (response.ok) {
        const filteredPurchases = json.filter((purchase) => {
          const purchaseDate = purchase.date;
          const lastClearDate = new Date(lastClear);
          const formattedLastClearDate = dateFormat(lastClearDate, "isoDateTime");

          console.log("purchaseDate", purchaseDate);
          console.log("lastClearDate", formattedLastClearDate);
          return purchaseDate > formattedLastClearDate;
        })
        console.log("Since last reset: ", filteredPurchases);
        setPurchases(filteredPurchases);

        setIsLoading(false);
      }
    };

    const interval = setInterval(fetchUsers, 10000); // Fetch every 10 second

    return () => {
      clearInterval(interval); // Clear the interval when the component unmounts
    };
  }, [lastClear]);

  return (
    <div>
      <div className="list-users__container">
        <ul>
          {purchases &&
            purchases.map((purchase) => {
              return (
                <div className="admin__show-users_list" key={purchase._id}>
                  <p>{JSON.stringify(purchase.user_id.name).replace(/\"/g, "")}</p>
                  <div>
                    <p>{purchase.date.split("T")[0]}</p>
                    <p>Total kostnad: {purchase.price_total} kr</p>
                  </div>
                </div>
              )
            })}

          {isLoading && (
            <div className="list-users__loading">
              <div className="list-users__loading-progress"></div>
              <p>Laddar flödet...</p>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ListUsers;
