import React from 'react';
import { useEffect, useState } from "react"
import URL from '../../proxyURL';



// <div className="users">
// {products && products.map((product) => (
// product.menu && product.menu.map((item) => (
//     <p key={item._id}>{item.type}</p>
//     ))
// ))}
// </div>
// styles
import './categories.css'

const CategoriesFika = () => {

    const [products, setProducts] = useState(null)

    useEffect(() => {
        const fetchMenu = async () => {
            const response = await fetch(`${URL}/api/products`)
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
                            return <button key={product._id}>{product.name}</button>;
                        } 
                        return null;
                    })}
                </>
            )}
            </div>
        </div>
    );

}

export default CategoriesFika