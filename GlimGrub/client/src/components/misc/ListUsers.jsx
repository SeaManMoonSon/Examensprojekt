import React from "react";
import { useEffect, useState } from "react";
import URL from "../../proxyURL.js";

// styles

const ListUsers = () => {
  const [purchases, setPurchases] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(`${URL}/api/purchases`);
      const json = await response.json();

      if (response.ok) {
        setPurchases(json);
        setIsLoading(false);
        // console.log("json", json);
      }
    };

    const interval = setInterval(fetchUsers, 10000); // Fetch every 10 second

    return () => {
      clearInterval(interval); // Clear the interval when the component unmounts
    };
  }, []);

  return (
    <div>
      {/* <h1>Här listas users</h1> */}
      <div>
        <ul>
          {purchases &&
            purchases.map((user) => {
              return (
                <div className="admin__show-users_list" key={user._id}>
                  <p>{JSON.stringify(user.user_id.name).replace(/\"/g, "")}</p>
                  <p>Total kostnad: {user.price_total}</p>
                  <p>{user.date}</p>
                </div>
              );
            })}
            {isLoading && (
              <p>Laddar flöde...</p>
            )}
        </ul>
      </div>
    </div>
  );
};

export default ListUsers;
