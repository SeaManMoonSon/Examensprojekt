import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/userAuthContext";

// styles
import "../../sass/style.scss";

const AdminSearchResultList = ({ results }) => {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const handleSingleUser = (userId) => {
    console.log(userId);
    navigate(`/admin/users/${userId}`);
  };

  return (
    <div className="admin__searchresult-container">
      {results.map((result, id) => {
        return (
          <div
            className="admin-searchresult-name"
            onClick={() => handleSingleUser(result._id)}
            key={id}
          >
            {result.name}{" "}
          </div>
        );
      })}
      {/* <div>A</div>
        <div>B</div>
        <div>C</div> */}
    </div>
  );
};
export default AdminSearchResultList;
