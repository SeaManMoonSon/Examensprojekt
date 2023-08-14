import React, { useState, useEffect } from 'react';
import URL from "../../proxyURL.js";

//components
import { CategoriesFika } from "../../components";
import Categories from "../../components/misc/Categories";
import Logout from "../../components/misc/Logout";
import UserBalance from "../../components/users/UserBalance";
import UserConfirmation from "../../components/users/UserConfirmation";
import { useAuthContext, userAuthContext } from "../../hooks/userAuthContext";
import { useLogout } from '../../hooks/useLogout';

import "../../sass/style.scss";

const UserLanding = () => {
  const { user } = useAuthContext();
  const [editedPassword, setEditedPassword] = useState("");
  const { logout } = useLogout();

  const pwChangePrompt = user.passwordChangePrompt;

  const resetUserPassword = async (test) => {
    const updatedUserPassword = {password: editedPassword};

    try {
      const response = await fetch(`${URL}/api/users/${user.user._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUserPassword),
      });

      if (response.ok) {
        console.log("Lösenord uppdaterat");
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(user.user);

    resetUserPassword();
    logout();
  };

  return (
    <div className="categories-container">
      <div className="categories__user-container">
        <div className="categories__img"></div>
        <div className="categories__img img-fika"></div>
        <div className="categories__user">
          <div className="categories__user-balance">
            {/* <UserBalance /> */}
          </div>
          <div className="categories__user-logout"></div>
        </div>
      </div>
      {pwChangePrompt ? (
        <div className="user-change_pw">
          <h2>Välkommen, {user.user.name.split(" ")[0]}</h2>
          <p>Du behöver ändra ditt lösenord.</p>
          <p>Vänligen välj ett lösenord med <b>fyra siffror.</b></p>

          <form onSubmit={handleSubmit}>
            <label htmlFor="password"></label>
            <input
              type="password"
              pattern="[0-9]+"
              name="password"
              placeholder="****"
              maxLength={4}
              value={editedPassword}
              onChange={(e) => setEditedPassword(e.target.value)}
              required
            />
            <input className="pw-submit_button" type="submit" value="Spara" />
          </form>
        </div>
      ) : (
        <div className="categories__menu">
          <div className="categories__menu-welcome">
            {user && (
              <div>
                <h3>Välkommen, {user.user.name.split(" ")[0]}</h3>
              </div>
            )}
            {user.user.role === "deltagare" && (
              <p>Ditt saldo: {user.user.balance} sek</p>
            )}
          </div>
          

          <div className="categories__menu-items">
            <Categories />
            {/* <CategoriesFika /> */}
          </div>
          <Logout />
        </div>
      )}
      
    </div>
  );
};

export default UserLanding;
