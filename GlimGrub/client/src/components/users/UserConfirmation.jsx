import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/userAuthContext";
// import Logout from "../misc/Logout";
import AdminLogout from "../admin/AdminLogout";
import URL from "../../proxyURL.js";
import dateFormat from "dateformat";
import { useLogout } from "../../hooks/useLogout";

// styles
import "../../sass/style.scss";

const UserConfirmation = ({ product, onDismiss }) => {
  const [confirmed, setConfirmed] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { logout } = useLogout();

  useEffect(() => {
    if (confirmed) {
      const timer = setInterval(() => {
        setCountdown((oldTime) => {
          if (oldTime <= 0) {
            clearInterval(timer);
            logout();
          } else {
            return oldTime - 1;
          }
        });
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  });

  const handleConfirmation = async () => {
    try {
      if (!product) {
        console.error("Product data is missing.");
        return;
      }

      console.log(product);

      const now = new Date();
      const formattedDate = dateFormat(now, "isoDateTime");

      const data = {
        user_id: user.user._id,
        date: formattedDate,
        price_total: 10,
        items: [
          {
            product_id: product._id,
            quantity: 1,
            price_one: product.price,
          },
        ],
      };

      if (user.user.balance - product.price >= 0 || user.user.role !== "deltagare") {
        const response = await fetch(`${URL}/api/purchases`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        const json = await response.json();

        if (!response.ok) {
          onDismiss();
          console.error(json.error);
        } else {
          setConfirmed(true);
          console.log("Purchase successful");
        }

      } else {
        onDismiss();
        console.log("User balance is too low");
      }

    } catch (error) {
      console.error(error);
    }
  };

  const handleEscape = () => {
    onDismiss();
  };

  return (
    <div className="user-confirmation__container">
      {!confirmed && (
        <div>
          <div className="user-confirmation__container-text">
            <h2>Vänligen bekräfta ditt val</h2>
            {product.map((product) => (
              <div className="user-confirmation__product">
                <i className="fa-solid fa-utensils"></i>
                <div className="user-confirmation__product-item">
                  <p>{product.name}, {product.price} kronor</p>
                </div>
              </div>
            ))}

          </div>
          <div className="user-confirmation__buttons">
            <button
              className="user-confirmation__buttons-escape"
              onClick={handleEscape}
            >
              Avbryt
            </button>
            <button
              className="user-confirmation__buttons-ok"
              onClick={handleConfirmation}
            >
              <p>Ok</p>
            </button>
          </div>
        </div>
      )}
      {confirmed && (
        <div>
          <div className="user-confirmation__container-text">
            <h2>Tack för din beställning</h2>
            <div className="user-confirmation__timer">
              Du loggas automatiskt ut om: {countdown}
            </div>
          </div>
          <div className="user-confirmation__buttons">
            <AdminLogout />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserConfirmation;
