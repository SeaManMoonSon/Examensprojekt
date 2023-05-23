import React from 'react';
import { useEffect, useState } from "react"
import UserConfirmation from '../users/UserConfirmation'
import URL from "../../proxyURL.js";

// styles
import '../../sass/style.scss'

const Categories = () => {
    const [popUp, setPopup] = useState(false);
    const [products, setProducts] = useState(null);

    const [selectedProduct, setSelectedProduct] = useState(null); // New state

    const [fika, setFika] = useState(false);

    const handleFika = () => {
        console.log("fika valt");
        setFika(true);
    }


    const handlePopup = (product) => {
        setSelectedProduct(product);
        setPopup(true);
    }

    useEffect(() => {
        const fetchMenu = async () => {
            const response = await fetch(`${URL}/api/products`);
            const json = await response.json()

            if (response.ok) {
                setProducts(json)
            }
        }

        fetchMenu()
    }, [])

    return (

        <div className="categories__container">
            <div className="categories__container-products">
                {products && !fika && (
                    <>
                        {products.map((product, index) => {
                            if (product.category === 'Fika') {
                                if (index === 0 || products[index - 1].category !== 'Fika') {
                                    return <button onClick={handleFika} key={product._id}>Fika</button>;
                                }

                            } else {
                                return <button onClick={() => handlePopup(product)} key={product._id}>{product.category}</button>;
                            }
                            return null;
                        })}
                    </>
                )}

                {fika &&
                    products.map((product) => {
                        if (product.category === "Fika") {
                            return <div className="admin__show-users_list" key={product._id}>
                                <button onClick={() => handlePopup(product)} key={product._id}>{product.name}</button>;
                            </div>;
                        }

                    })}

            </div>

            {popUp && (
                <div className="popup__wrap">
                    <div className="popup__overlay"></div>
                    <div className="categories__user-confirmation">
                        <UserConfirmation product={selectedProduct} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Categories;
