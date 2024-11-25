import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from './CartContext';
import './styles/ProductView.css';

const description = 'Earrings are a popular form of jewelry worn on the ears, typically designed to enhance ones appearance.';
const care = 'For metal earrings, gently clean with a soft cloth to remove dirt and oils.';

function ProductView({ products }) {
    window.scrollTo(0, 0); 
    const [selectedOption, setSelectedOption] = useState('Option 1');
    const { id } = useParams();
    const { addToCart } = useCart();

    const product = products.find((prod) => prod._id === id);

    if (!product) {
        return <h1>Product not found</h1>;
    }

    const handleAddToCart = () => {
        addToCart(product);  
        console.log('Product added to cart:', product);
    };

    return (
        <div className="pr-container">
            <div className="pr-view">
                <div className="pr-image">
                    <img src={product.image} alt={product.name} />
                </div>
                <div className="pr-details">
                    <div className="txt">
                        <h1>{product.name}</h1>
                        <div className='price'>${(product.priceCents / 100).toFixed(2)}</div>
                    </div>
                    <p className="desc">{product.description}</p>
                    <button className="add-to-cart" onClick={handleAddToCart}>Add to Cart</button>

                    <div className="additional-info">
                        <div className="options">
                            <h6 
                                className={`option ${selectedOption === 'Option 1' ? 'selected' : ''}`}
                                onClick={() => setSelectedOption('Option 1')}
                            >
                                Description
                            </h6>
                            <h6 
                                className={`option ${selectedOption === 'Option 2' ? 'selected' : ''}`}
                                onClick={() => setSelectedOption('Option 2')}
                            >
                                Care
                            </h6>
                        </div>
                        <div>
                            {selectedOption === 'Option 1' && <p>{description}</p>}
                            {selectedOption === 'Option 2' && <p>{care}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductView;
