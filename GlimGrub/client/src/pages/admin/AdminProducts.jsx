import React, { useState, useEffect } from 'react';
import URL from "../../proxyURL.js";

// components
import AdminNavbar from "../../components/admin/AdminNavbar";
import AdminAddProduct from '../../components/admin/AdminAddProduct';

// styles
import '../../sass/style.scss'

const AdminProducts = () => {
    const [products, setProducts] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const response = await fetch(`${URL}/api/products`);
        const json = await response.json();

        if (response.ok) {
            setProducts(json);
        }
    };


    const addProduct = async (product) => {
        const response = await fetch(`${URL}/api/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        });

        if (response.ok) {
            const newProduct = await response.json();
            setProducts([...products, newProduct]);
        }
    };


    return (
        <div className="admin__container">
            <AdminNavbar />
            <div className="admin__products-info">
                <h1>Produkter</h1>
                <p>Här listas era nuvarande produkter.</p>
            </div>
            <div className="admin__products-add">
                <form action="POST">
                    <input type="text" />
                    <button></button>
                </form>
            </div>
            <div className="admin__products-list">
                    <AdminAddProduct addProduct={addProduct}/>
                <ul>

                    {products &&
                        products.map((product) => {
                            return <div className="admin__products-list_item" key={product._id}>
                                <p>{product.name}</p>
                                <p>{product.price}</p>
                                <div className="admin__products-list_item-wrap">
                                    <button>Redigera</button><button>Ta bort</button>
                                </div>
                            </div>;
                        })}

                    {/* <div className="admin__products-list_item">
                        <p>Marabou</p>
                        <p>5 kr</p>
                        <div className="admin__products-list_item-wrap">
                            <button>Redigera</button><button>Ta bort</button>
                        </div>
                    </div>

                    <div className="admin__products-list_item">
                        <p>Snickers</p>
                        <p>5 kr</p>
                        <div className="admin__products-list_item-wrap">
                            <button>Redigera</button><button>Ta bort</button>
                        </div>
                    </div> */}
                </ul>

            </div>
        </div>
    )
}

export default AdminProducts