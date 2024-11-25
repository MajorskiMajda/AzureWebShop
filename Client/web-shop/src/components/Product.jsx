import React from "react";
import { useNavigate } from "react-router-dom";

function Product({ id, name, price, description, image }) {
    const navigate = useNavigate();

    const handleProductClick = () => {
        navigate(`/product/${id}`);
    };

    return (
        <div className="product-container" onClick={handleProductClick}>
            <div className="earring-container">
                <img 
                    alt={name} 
                    className="earring-img" 
                    id="photo" 
                    src={image} 
                />
            </div>
            <div className="info-container">
                <div className="name-container">
                    <div className="xx">
                        <h1 className="earring-name serif-font">{name}</h1>
                        <div className="price1">${price}</div>
                    </div>
                    <p className="earring-description sans-font">{description}</p>
                </div>
            </div>
        </div>
    );
}

export default Product;
