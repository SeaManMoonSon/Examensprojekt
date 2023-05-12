import React from 'react';
import { useEffect, useState } from "react"
import UserConfirmation from '../users/UserConfirmation'


// <div className="users">
// {products && products.map((product) => (
// product.menu && product.menu.map((item) => (
//     <p key={item._id}>{item.type}</p>
//     ))
// ))}
// </div>
// styles
import './categories.css'

const Categories = () => {
    const [popUp, setPopup] = useState(false);
    const [products, setProducts] = useState(null)

    const handlePopup = () => {
        setPopup(true);
    }

    useEffect(() => {
        const fetchMenu = async () => {
            const response = await fetch('/api/products')
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
                {products && (
                    <>
                        {products.map((product, index) => {
                            if (product.category === 'Fika') {
                                if (index === 0 || products[index - 1].category !== 'Fika') {
                                    return <button key={product._id}>Fika</button>;
                                }
                            } else {
                                return <button onClick={handlePopup} key={product._id}>{product.category}</button>;
                            }
                            return null;
                        })}
                    </>
                )}
            </div>

            {popUp && (
                <div>
                    <UserConfirmation/>
                </div>
            )}
        </div>


    );

}

export default Categories