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
  const [countdown, setCountdown] = useState(3);
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const [totalPrice, setTotalPrice] = useState(0);

  console.log("user confirmation comp log");

  useEffect(() => {
    const totalPrice = product.reduce(
      (total, item) => total + item.price * item.quantity, 0
    );
    // console.log("price calc log", totalPrice);
    setTotalPrice(totalPrice);
  }, [product]);

  const handleConfirmation = async () => {
    try {
      if (!product) {
        console.error("Product data is missing.");
        return;
      }

      const now = new Date();
      const formattedDate = dateFormat(now, "isoDateTime");
      const data = {
        user_id: user.user._id,
        date: formattedDate,
        price_total: totalPrice,
        items: product.map((item) => ({
          product_id: item._id,
          quantity: item.quantity,
          price_one: item.price,
        })),
      };

      // console.log("data: ", data);

      if (user.user.balance - data.price_total >= 0 || user.user.role !== "deltagare") {
        const response = await fetch(`${URL}/api/purchases`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        setConfirmed(true);

        const json = await response.json();
        // console.log("json: ", json);

        if (!response.ok) {
          // onDismiss();
          console.log("Här smäller det: ", json.error);
          logoutTimer();
        } else {
          // setConfirmed(true);
          console.log("Purchase successful");
        }
      } else {
        onDismiss();
        console.log("Purchase failed, user balance too low");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (confirmed) {
      logoutTimer();
    }
  }, [confirmed]);

  const handleEscape = () => {
    onDismiss();
  };

  const logoutTimer = () => {
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

  return (
    <div className="user-confirmation__container">
      {!confirmed && (
        <div>
          <div className="user-confirmation__container-text">
            <h2>Vänligen bekräfta ditt val</h2>

            {product.length > 1 && (
              <div className="user-confirmation__container-products">
                {product.map((product) => (
                  <div
                    key={product._id}
                    className="user-confirmation__product-div"
                  >
                    <p className="product-info">
                      <i className="fa-solid fa-utensils"></i>
                      {product.name} {product.price} kr/st{" "}
                    </p>
                    <p className="product-quantity">
                      Antal: {product.quantity}
                    </p>
                  </div>
                ))}
                <p>Totalt: {totalPrice} kr</p>
              </div>
            )}

            {product.length === 1 && (
              <div className="user-confirmation__container-products">
                <div className="user-confirmation__product-div">
                  <p className="product-info">
                    <i className="fa-solid fa-utensils"></i>
                    {product[0].name} {product[0].price} kr/st
                  </p>
                  <p className="product-quantity">
                    Antal: {product[0].quantity}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="user-confirmation__buttons">
            <button
              className="user-confirmation__buttons-escape"
              onClick={handleEscape}
            >
              <p>Avbryt</p>
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
