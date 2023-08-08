import React from "react";
import { useEffect, useState } from "react";
import URL from "../../proxyURL.js";
import dateFormat from "dateformat";

// styles

const ListUsers = () => {
  const [purchases, setPurchases] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastResetTimestamp, setLastResetTimestamp] = useState(null); // State to hold the timestamp from the backend

  useEffect(() => {
    const fetchLastResetTimestamp = async () => {
      try {
        const response = await fetch(`${URL}/api/clearfeed`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          }
      });
        const data = await response.json();

        if (response.ok) {
          setLastResetTimestamp(data.timestamp);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchLastResetTimestamp();
  }, []);

  useEffect(() => {
    if (lastResetTimestamp) {
      const fetchPurchases = async () => {
        try {
          const response = await fetch(`${URL}/api/purchases`);
          const json = await response.json();

          if (response.ok) {
            const filteredPurchases = json.filter((purchase) => {
              const purchaseDate = new Date(purchase.date);
              const lastResetDate = new Date(lastResetTimestamp);

              return purchaseDate > lastResetDate;
            });

            setPurchases(filteredPurchases);
            setIsLoading(false);
          }
        } catch (error) {
          console.error("Error fetching purchases:", error);
        }
      };

      fetchPurchases();

      const interval = setInterval(fetchPurchases, 10000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [lastResetTimestamp]);

  return (
    <div>
      <div className="list-users__container">
        <ul>
          {purchases &&
            purchases.map((purchase) => {
              return (
                <div className="admin__show-users_list" key={purchase._id}>
                  <p>
                    {JSON.stringify(purchase.user_id.name).replace(/\"/g, "")}
                  </p>
                  <div>
                    <p>{purchase.date.split("T")[0]}</p>
                    <p>Total kostnad: {purchase.price_total} kr</p>
                  </div>
                </div>
              );
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
