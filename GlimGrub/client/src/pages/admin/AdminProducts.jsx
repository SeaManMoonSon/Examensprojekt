import React, { useState, useEffect } from 'react';
import URL from "../../proxyURL.js";

// components
import AdminNavbar from "../../components/admin/AdminNavbar";
import AdminAddProduct from '../../components/admin/AdminAddProduct';

// styles
import '../../sass/style.scss'

const AdminProducts = () => {
    const [products, setProducts] = useState(null);
    const [editingProduct, setEditingProduct] = useState(null);
    const [editedName, setEditedName] = useState('');
    const [editedPrice, setEditedPrice] = useState('');
    const [editedRole, setEditedRole] = useState('');
    const [editedCategory, setEditedCategory] = useState('');
    const [addNewProduct, setAddNewProduct] = useState(false);


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

    const updateProduct = async (productId) => {
        const updatedProduct = {
            name: editedName,
            price: editedPrice,
            role: editedRole,
            category: editedCategory
        };

        try {
            const response = await fetch(`${URL}/api/products/${productId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProduct),
            });

            if (response.ok) {
                console.log('Produkten är uppdaterad!');
                setEditingProduct(null);
                fetchProducts();
            } else {
                console.error('Tyvärr gick det inte att uppdatera produkten, försök igen.');
            }
        } catch (error) {
            console.error('Det blev ett litet fel: ', error);
        }
    };

    const deleteProduct = async (productId) => {
        const response = await fetch(`${URL}/api/products/${productId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            const updatedProducts = products.filter(
                (product) => product._id !== productId
            );

            setProducts(updatedProducts);
        }
    };

    const handleAddProduct = () => {
        setAddNewProduct(true);
    }

    const handleAddProductClose = () => {
        setAddNewProduct(false);
    }

    return (
        <div className="admin__container">
            <AdminNavbar />
            <div className="admin__products-info">
                <h1>Produkter</h1>
                <p>Här listas era nuvarande produkter.</p>
            </div>
            <div className="admin__products-add">
                <button onClick={handleAddProduct}><i className="fa-solid fa-plus"></i>Lägg till ny produkt</button>
            </div>
            <div className="admin__products-list">
                <div className="popup__overlay">

                    {addNewProduct && (

                        <div className="popup__wrap">
                            <div className="overlay">
                                <div className="popup__container">


                                    <div><button className="popup__close" onClick={handleAddProductClose}><i class="fa-solid fa-xmark"></i></button>
                                        <AdminAddProduct addProduct={addProduct} /></div>
                                </div>
                            </div>
                        </div>
                    )}


                </div>

                <ul>
                    {products &&
                        products.map((product) => {
                            if (editingProduct && editingProduct._id === product._id) {
                                return (
                                    // <div className="popup__wrap">
                                    //     <div className="popup__overlay">
                                    //         <div className="popup__container">
                                                <div className="admin__products-list_item" key={product._id}>
                                                    <input
                                                        type="text"
                                                        value={editedName}
                                                        placeholder={product.name}
                                                        onChange={(e) => setEditedName(e.target.value)}
                                                    />
                                                    <input
                                                        type="number"
                                                        value={editedPrice}
                                                        placeholder={product.price}
                                                        onChange={(e) => setEditedPrice(e.target.value)}
                                                    />
                                                    <input
                                                        type="text"
                                                        value={editedCategory}
                                                        placeholder={product.category}
                                                        onChange={(e) => setEditedCategory(e.target.value)}
                                                    />
                                                    <input
                                                        type="text"
                                                        value={editedRole}
                                                        placeholder={product.role}
                                                        onChange={(e) => setEditedRole(e.target.value)}
                                                    />
                                                    <div className="admin__products-list_item-wrap">
                                                        <button onClick={() => updateProduct(product._id)}><i class="fa-solid fa-check"></i></button>
                                                        <button onClick={() => setEditingProduct(null)}>Avbryt</button>
                                                    </div>
                                                </div>
                                    //         </div>
                                    //     </div>
                                    // </div>
                                );
                            } else {
                                return (
                                    <div className="admin__products-list_item" key={product._id}>
                                        <p>{product.name}</p>
                                        <p>{product.price} kr</p>
                                        <p>{product.category}</p>
                                        <p>{product.role}</p>
                                        <div className="admin__products-list_item-wrap">
                                            <button onClick={() => setEditingProduct(product)}>Redigera</button>
                                            <button onClick={() => deleteProduct(product._id)}><i class="fa-solid fa-trash"></i></button>
                                        </div>
                                    </div>
                                );
                            }
                        })}
                </ul>
            </div>
        </div>
    )
}

export default AdminProducts