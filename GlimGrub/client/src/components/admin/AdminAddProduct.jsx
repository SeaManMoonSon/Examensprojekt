import React, { useState } from 'react';

const AddProductForm = ({ addProduct }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [role, setRole] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        addProduct({ name, price, category, role });
        setName('');
        setPrice('');
        setCategory('');
        setRole('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Produktens namn: </label>

            <input
                type="text"
                id="name"
                value={name}
                onChange={handleNameChange}
                required
            />

            <label htmlFor="price">Produktens pris: </label>

            <input
                type="number"
                id="price"
                value={price}
                onChange={handlePriceChange}
                required
            />

            <label htmlFor="category">Kategori: </label>

            <input
                type="text"
                id="category"
                value={category}
                onChange={handleCategoryChange}
                required
            />

            <label htmlFor="role">Roll: </label>

            <input
                type="number"
                id="role"
                value={role}
                onChange={handleRoleChange}
                required
            />

            <button type="submit">Lägg till produkt</button>
        </form>
    )
};

export default AddProductForm;