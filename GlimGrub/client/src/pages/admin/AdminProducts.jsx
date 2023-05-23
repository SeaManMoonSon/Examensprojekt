import React, { useState, useEffect } from 'react';
import URL from "../../proxyURL.js";



// components
import AdminNavbar from "../../components/admin/AdminNavbar";

// styles
import '../../sass/style.scss'

const AdminProducts = () => {

    const [products, setProducts] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch(`${URL}/api/products`);
            const json = await response.json()

            if (response.ok) {
                setProducts(json)
            }
        }

        fetchProducts()
    }, [])

    return (
        <div className="admin__container">
            <AdminNavbar />
            <div className="admin__products-info">
                <h1>Produkter</h1>
                <p>Här listas era nuvarande produkter.</p>
            </div>
            <div className="admin__products-add">
                <button>Lägg till ny produkt via component +</button>
            </div>
            <div className="admin__products-list">

                <ul>

                {products &&
                        products.map((product) => {
                            return <div key={product._id}>
                                <p>{product.name}</p>
                                <p>{product.price}</p>
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