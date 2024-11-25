import React from 'react';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import { useCart } from './CartContext';
import './styles/CheckoutProduct.css';

const CheckoutProduct = () => {
    const { cartItems, updateQuantity, removeFromCart } = useCart();

    if (!cartItems || cartItems.length === 0) {
        return <div className='empty'>Your cart is empty</div>; 
    }

    return (
        <div>
            {cartItems.map((cartItem) => (
                <div className="checkout-product-div" key={cartItem._id}>
                    <img className="checkout-product-img" src={cartItem.image} alt={cartItem.name} />
                    <div className="checkout-product-text-div">
                        <h1 className="">{cartItem.name}</h1>
                        <div className="product-price">${(cartItem.priceCents/100).toFixed(2)}</div>
                        <div className="quantity-info">
                            <div className="product-price">Quantity</div>
                            <button
                                type="button"
                                className="button-quantity plus"
                                onClick={() => updateQuantity(cartItem._id, cartItem.quantity + 1)}
                            >
                                <AddRoundedIcon className='sign' />
                            </button>
                            <div className="quantity-number">{cartItem.quantity}</div>
                            <button
                                type="button"
                                className="button-quantity minus"
                                onClick={() => {
                                    if (cartItem.quantity > 1) {
                                        updateQuantity(cartItem._id, cartItem.quantity - 1);
                                    } else {
                                        removeFromCart(cartItem._id);
                                    }
                                }}
                            >
                                <RemoveRoundedIcon className='sign' />
                            </button>
                        </div>
                        <button
                            className="delete-button"
                            onClick={() => removeFromCart(cartItem._id)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CheckoutProduct;
