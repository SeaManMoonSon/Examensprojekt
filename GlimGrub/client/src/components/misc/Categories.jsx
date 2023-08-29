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

  const [showCartNotification, setShowCartNotification] = useState(false);


  const [fika, setFika] = useState(false);

  const handleFika = () => {
    console.log("fika valt");
    setFika(true);
  };

  // console.log("Roll: ", user.user.role);

  const handlePopup = (selectedProducts) => {
    // console.log("You are buying this: ", selectedProducts)
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
    const updatedProducts = selectedProducts.map((product) => {
      if (product._id === productId) {
        const decreasedQuantity = product.quantity -1;
        return decreasedQuantity > 0 ? { ...product, quantity: decreasedQuantity } : null;
      }
      return product;
    }).filter((product) => product !== null);
  
    setSelectedProducts(updatedProducts);
  };

  const handleSelectedProduct = (product) => {
    // Find the index of the selected product in the array. -1 if not in the array
    const productIndex = selectedProducts.findIndex((p) => p._id === product._id);
    // console.log("productIndex: ", productIndex);
  
    if (productIndex !== -1) {
      // If the product is already in the array, increase its quantity instead
      const updatedProducts = [...selectedProducts];
      updatedProducts[productIndex].quantity += 1;
      setSelectedProducts(updatedProducts);
    } else {
      // If the product is not in the array, add it with quantity 1
      setSelectedProducts([...selectedProducts, { ...product, quantity: 1 }]);
    }
  
    setShowCartNotification(true);
  };

  // const handleAddToCart = () => {
  //   setShowCartNotification(!showCartNotification);
  // }

  const handleCheckout = () => {
    setShowPopup(true);
    // console.log("Popup info: ", selectedProducts);
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

  const calculateTotalProducts = (products) => {
    return products.reduce((totalQuantity, product) => {
      return totalQuantity + product.quantity;
    }, 0);
  };
  const totalQuantity = calculateTotalProducts(selectedProducts)

  return (
    <div className="categories__container">
      <div className="categories__container-products">

        {/* <button
          className="cart-btn"
          onClick={handleCheckout}><i class="fa-solid fa-cart-shopping"></i>
        </button> */}

        {user.user.role === "personal" && (
          <>
            <div className="cart-btn_container">
              {selectedProducts.length > 0 && 
              <div className="cart-btn_notification">{totalQuantity}</div>
              }
              <button
                className="cart-btn"
                onClick={handleCheckout}><i class="fa-solid fa-cart-shopping"></i>
              </button>
            </div>

            {products && (
              <>
                {products.map((product) => {
                  if (product.role != 0) {
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
                  return null;
                })}
              </>
            )}
          </>
        )}


        {user.user.role === "deltagare" && (
          <>
            <div className="cart-btn_container">
              {selectedProducts.length > 0 && 
              <div className="cart-btn_notification">{totalQuantity}</div>
              }
              <button
                className="cart-btn"
                onClick={handleCheckout}><i class="fa-solid fa-cart-shopping"></i>
              </button>
            </div>

            {products && !fika && (
              <>
                {products.map((product) => {
                  if (product.category != "Fika" && product.role != 1) {
                    return (
                      <button
                        className={`product-button ${selectedProducts.includes(product) ? 'selected' : ''}`}
                        onClick={() => {
                          handleSelectedProduct(product);
                          // handleAddToCart();
                        }}
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
                    <li>{product.quantity} {product.name}, {product.price} kr/st</li>
                  </div>
                  <div className="user-cart_item-button">
                    {product.quantity > 1 ? (
                      <button className="button-remove" onClick={() => handleRemove(product._id)}>Minska antal</button>
                    ) : (
                      <button className="button-remove" onClick={() => handleRemove(product._id)}>Ta bort</button>
                    )}
                  </div>
                </div>
              ))}

            </ul>

            <button className="button-cancel" onClick={handlePopupClose}>Fortsätt handla</button>
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
