import React from 'react';
import { useEffect, useState } from "react"



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

    const [products, setProducts] = useState(null)

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

        <div className="users">

            {/* {products &&
                products.forEach((product) => {
                    if(product.category !== 'fika') {
                        <p key={product._id}>{product.category}</p>
                    }
                })} */}

            {/* {products && products
                .filter((product) => product.category !== 'Fika')
                .map((product) => (
                    <p key={product._id}>{product.category}</p>
                ))
            } */}

            {products && (
                <>
                    {products.map((product, index) => {
                        if (product.category === 'Fika') {
                            if (index === 0 || products[index - 1].category !== 'Fika') {
                                return <p key={product._id}>Fika</p>;
                            }
                        } else {
                            return <p key={product._id}>{product.category}</p>;
                        }
                        return null;
                    })}
                </>
            )}



        </div>
    );

}

export default Categories