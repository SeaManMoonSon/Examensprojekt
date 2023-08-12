import React from 'react';

import { useState } from "react";
import { useNavigate } from "react-router-dom";

//components
import { useLogin } from "../../hooks/useLogin";
import { useAuthContext } from "../../hooks/userAuthContext";
import Logout from "../../components/misc/Logout";

// styles
import '../../sass/style.scss'

const AdminStart = () => {

  const { user } = useAuthContext();
  const [ssn, setSsn] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(login(ssn, password));

    console.log("btn triggered");

    const {loginSuccessful, userRole} = await login(ssn, password);

    console.log(loginSuccessful);

      if (loginSuccessful) {
        if(userRole === "admin") {
        navigate('/admin/landing');
        console.log(userRole);
      } else {
        console.log("funkar inte");
    }
  };
}

  return (
    <div className="admin-login-page__container">

      <div className="admin-login-page__img">
      </div>

      <div className="admin-login-page__form-container">
        <form onSubmit={handleSubmit}>
          <div className="admin-login-page__form-text">
            <h3>GlimCrub</h3>
            <p>Välkommen Admin</p>
          </div>

          <div className="admin-login-page__form-input">
            {/* <label>Personnummer:</label> */}
            <input
              type="text"
              name="ssn"
              onChange={(e) => setSsn(e.target.value)}
              value={ssn}
              placeholder="Användarnamn"
            />

            {/* <label>PIN</label> */}
            <input
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Lösenord"
            />

            <button>Logga in</button>
            {/* {error && <div className="error">{error}</div>} */}
          </div>
        </form>
      </div>
    </div>
  )
}

export default AdminStart