import React from "react";
import { useEffect, useState } from "react";
import UserConfirmation from "../users/UserConfirmation";
import URL from "../../proxyURL.js";
import { useAuthContext } from "../../hooks/userAuthContext";

// styles
import "../../sass/style.scss";

const Categories = () => {
  const { user } = useAuthContext();

  const [popUp, setPopup] = useState(false);
  const [products, setProducts] = useState(null);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const [showPopup, setShowPopup] = useState(false);


  const [fika, setFika] = useState(false);

  const handleFika = () => {
    console.log("fika valt");
    setFika(true);
  };

  // console.log("Roll: ", user.user.role);

  const handlePopup = (product) => {
    setSelectedProduct(product);
    setPopup(true);
  };

  const handlePopupDismiss = () => {
    setPopup(false);
  };

  const handleSelectedProduct = (product) => {
    setSelectedProducts([...selectedProducts, product]);

    console.log("You have selected", selectedProducts);
  }

  const handleCheckout = () => {
    setShowPopup(true);
    console.log("Shows popup");
  }

  useEffect(() => {
    const fetchMenu = async () => {
      const response = await fetch(`${URL}/api/products`);
      const json = await response.json();

      if (response.ok) {
        setProducts(json);
      }
    };

    fetchMenu();
  }, []);

  return (
    <div className="categories__container">
      <div className="categories__container-products">
        {user.user.role === "personal" && (
          <>
            {products && (
              <>
                {products.map((product) => {
                  if (product.role != 0) {
                    return (
                      <button
                        onClick={() => handlePopup(product)}
                        key={product._id}
                      >
                        {product.name}
                      </button>
                    );
                  }
                  return null;
                })}
              </>
            )}
          </>
        )}

        {user.user.role === "deltagare" && (
          <>
            {products && !fika && (
              <>
                {products.map((product) => {
                  if (product.category != "Fika" && product.role != 1) {
                    return (
                      <button
                        onClick={() => handlePopup(product)}
                        key={product._id}
                      >
                        {product.name}
                      </button>
                    );
                  }
                })}
                <button onClick={handleFika}>Fika</button>
              </>
            )}

            {fika && (
              <>
                <div className="categories__btn-back" onClick={() => setFika(false)}>
                <i class="fa-solid fa-arrow-left-long"></i>
                </div>
                <button onClick={handleCheckout}>Varukorg</button>
                {products.map((product) => {
                  if (product.category === "Fika" && product.role !== 1) {
                    return (
                      <div className="admin__show-users_list" key={product._id}>
                        <button
                          onClick={() => handleSelectedProduct(product)}
                          key={product._id}
                        >
                          {product.name}
                        </button>
                      </div>
                    );
                  }
                })}
                {/* {selectedProducts.length > 0 && <button onClick={handleCheckout}>Checkout</button>} */}
              </>
            )}
          </>
        )}
      </div>

      {showPopup && ( 
        <div className="popup">
        <h2>Din varukorg</h2>
        <ul>
          {selectedProducts.map((product) => (
            <li key={product._id}>{product.name}</li>
          ))}
        </ul>
        </div>
      )}

      {popUp && (
        <div className="popup__wrap">
          <div className="popup__overlay"></div>
          <div className="categories__user-confirmation">
            <UserConfirmation
              product={selectedProduct}
              onDismiss={handlePopupDismiss}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
