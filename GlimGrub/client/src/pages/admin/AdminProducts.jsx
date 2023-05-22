import React from 'react';

// components
import AdminNavbar from "../../components/admin/AdminNavbar";

// styles
import '../../sass/style.scss'

const AdminProducts = () => {
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
                    <div className="admin__products-list_item">
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
                    </div>
                </ul>

            </div>
        </div>
    )
}

export default AdminProducts