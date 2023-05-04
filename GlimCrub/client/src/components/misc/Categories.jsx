import React from 'react';
import { useEffect, useState } from "react"

// styles
import './categories.css'

const Categories = () => {

    const [products, setProducts] = useState(null)

    useEffect(() =>  {
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
            {products && products.map((product) => (
            product.menu && product.menu.map((item) => (
                <p key={item._id}>{item}</p>
                ))
            ))}
        </div>
        )
}

export default Categories