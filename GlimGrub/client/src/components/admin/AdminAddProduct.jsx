import React, { useState } from 'react';

const AddProductForm = ({ addProduct }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState("Mat");
    const [role, setRole] = useState(2);

    console.log(role);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };

    const handleCategoryChange = (event) => {
        if (event.target.checked) {
            setCategory("Fika");
        } 
    };

    const handleRoleChange = (event) => {
        const selectedRole = parseInt(event.target.value, 10);
        setRole(selectedRole);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        addProduct({ name, price, category, role });
        setName('');
        setPrice('');
        setCategory();
        setRole('');
    };

    return (
        <div className="admin__add-products_container">
            <h2>Lägg till en ny produkt</h2>
            <form onSubmit={handleSubmit}>
                {/* <label htmlFor="name">Produktens namn: </label> */}
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={handleNameChange}
                    placeholder="Produktnamn"
                    required
                />

                {/* <label htmlFor="price">Produktens pris: </label> */}

                {/* <label htmlFor="role">Roll: </label> */}

                <div className="input-wrap">
                <input
                    type="number"
                    id="price"
                    value={price}
                    onChange={handlePriceChange}
                    placeholder="Pris"
                    required
                />

                <select id="role" name="role" value={role} onChange={handleRoleChange}>
                    <option value={2}>Alla</option>
                    <option value={0}>Deltagare</option>
                    <option value={1}>Personal</option>
                </select>
                </div>

                <div className="admin__add-products-fika">
                <label htmlFor="category">Markera produkten som fika</label>
                <input
                    type="checkbox"
                    name="category"
                    id="category"
                    onChange={handleCategoryChange}
                />
                </div>

                <button type="submit">Lägg till produkt</button>
            </form>
        </div>
    )
};

export default AddProductForm;