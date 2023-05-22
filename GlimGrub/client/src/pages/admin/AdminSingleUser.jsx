import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import URL from "../../proxyURL.js";

const AdminSingleUser = (props) => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${URL}/api/users/${id}`);
        if (!response.ok) {
          throw new Error('User not found');
        }
        console.log("Id: ", id);

        const data = await response.json();
        setUser(data);

        console.log("User: ", data);
        
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [id]);

  if (!user) {
    return <div>No user found</div>;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>{user.role}</h3>

      <p>{user.balance}</p>
      {/* Render other user details */}
    </div>
  );
};

export default AdminSingleUser;
