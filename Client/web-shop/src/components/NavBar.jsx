import React, { useState } from 'react';
import './styles/NavBar.css';
import NavIcon from './styles/images/NavIcon.svg';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';

function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { getCartQuantity } = useCart();
    const cartQuantity = getCartQuantity();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleScrollToAbout = () => {
        const aboutSection = document.getElementById("about");
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleScrollToContact = () => {
        const aboutSection = document.getElementById("contact");
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <>
            <header>
                <Link to="/">
                    <img alt='logo' src={NavIcon}></img>
                </Link>
                <ul className={`nav-list ${isMenuOpen ? 'active' : ''}`}>
                    <li> <Link to="/" className='link'>Home</Link></li>
                    <li> <Link to="/jewelry" className='link'>Jewelry</Link></li>
                    <li onClick={handleScrollToAbout} className='link' ><Link className='link' to="/#about">About</Link></li>
                    <li onClick={handleScrollToContact} className='link' >Contact</li>
                    <li><Link className='link' to="/orders">Orders</Link></li>
                    <li className='display'>
                        <div className='cart-div'>
                        <Link className='link' to="/cart">
                            <ShoppingCartIcon />
                            {cartQuantity > 0 && <div className='cart-q'>{cartQuantity}</div>}
                            </Link>
                            </div>
                    </li>
                </ul>
                <div className="hamburger-menu" onClick={toggleMenu}>
                    <MenuRoundedIcon />
                </div>
            </header>
        </>
    );
}

export default NavBar;
