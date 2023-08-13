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

  const handlePopup = (selectedProducts) => {
    // setSelectedProduct(product);
    console.log("You are buying this: ", selectedProducts)
    setSelectedProducts(selectedProducts);
    setPopup(true);
    setShowPopup(false);
  };

  const handlePopupDismiss = () => {
    setPopup(false);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  }

  const handleRemove = (productId) => {
    console.log("Remove this: ");

    const updateCart = selectedProducts.filter(
      product => product._id !== productId
    );
    setSelectedProducts(updateCart);

  }

  const handleSelectedProduct = (product) => {
    setSelectedProducts([...selectedProducts, product]);

    console.log("You have selected", selectedProducts);
  }

  const handleCheckout = () => {
    setShowPopup(true);
    console.log("Popup info: ", selectedProducts);
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
            <button onClick={handleCheckout}>Varukorg</button>
            {products && (
              <>
                {products.map((product) => {
                  if (product.role != 0) {
                    return (
                      <button
                        onClick={() => handleSelectedProduct(product)}
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

        <button
          className="product-button"
          onClick={handleCheckout}><i class="fa-solid fa-cart-shopping"></i>
        </button>


        {user.user.role === "deltagare" && (
          <>
            {products && !fika && (
              <>
                {products.map((product) => {
                  if (product.category != "Fika" && product.role != 1) {
                    return (
                      <button
                        className={`product-button ${selectedProducts.includes(product) ? 'selected' : ''}`}
                        onClick={() => handleSelectedProduct(product)}
                        key={product._id}
                      >
                        {product.name}
                      </button>
                    );
                  }
                })}
                <button
                  className="product-button"
                  onClick={handleFika}>Fika</button>
              </>
            )}



            {fika && (
              <>
                <div className="categories__btn-back" onClick={() => setFika(false)}>
                  <i class="fa-solid fa-arrow-left-long"></i>
                </div>

                {products.map((product) => {
                  if (product.category === "Fika" && product.role !== 1) {
                    return (
                      <div className="admin__show-users_list" key={product._id}>
                        <button
                          className={`product-button ${selectedProducts.includes(product) ? 'selected' : ''}`}
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
        <div className="overlay">

          <div className="user-cart_container">
            <h2>Din varukorg</h2>
            <ul>
              {selectedProducts.map((product) => (
                <div className="user-cart_item-container" key={product._id}>
                  <div className="user-cart_item-text">
                    <li>{product.name}, {product.price} kr{' '}</li>
                  </div>
                  <div className="user-cart_item-button">
                    <button className="button-remove" onClick={() => handleRemove(product._id)}>Ta bort</button>
                  </div>
                </div>
              ))}

            </ul>

            <button onClick={handlePopupClose}>Fortsätt handla</button>
            <button className="button-payment" onClick={() => handlePopup(selectedProducts)}>Betala</button>
          </div>
        </div>

      )}


      {popUp && (
        <div className="popup__wrap">
          <div className="popup__overlay"></div>
          <div className="categories__user-confirmation">
            <UserConfirmation
              product={selectedProducts}
              onDismiss={handlePopupDismiss}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
