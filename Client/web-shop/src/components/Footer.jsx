import React from 'react';
import './styles/Footer.css';
import NavIcon from './styles/images/NavIcon.svg';
import { Link } from 'react-router-dom';

let date = new Date();
let year = date.getFullYear();

function Footer() {


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
            <footer>
                <div className='img-div'>
                    <img alt='footer-img' src='https://i.ibb.co/DM6xdG1/bracelet-img.jpg'></img>
                    <img alt='footer-img' src='https://i.ibb.co/jJQxSdd/necklace-img.png' ></img>
                    <img alt='footer-img' src='https://i.ibb.co/F7xpPyj/earring-img.png'></img>
                </div>
                <div id='contact' className='info-container'>
                    <div className='info'>
                        <div className='links'>
                            <h4>Links</h4>
                            <ul>
                                <li><Link className='link-footer' to="/">Home</Link></li>
                                <li><Link className='link-footer' to="/jewelry">Jewelry</Link></li>
                                <li onClick={handleScrollToAbout} ><Link className='link-footer' to="/#about">About</Link></li>
                                <li><Link className='link-footer' to="/orders">Orders</Link></li>
                            </ul>
                        </div>
                        <div className='contact'>
                            <h4>Contact</h4>
                            <ul>
                                <li>Email: info@example.com</li>
                                <li>Phone: 123-456-7890</li>
                                <li>Address: 123 Main St, City, State, Zip</li>
                            </ul>
                        </div>
                        <div className='newsletter'>
                            <form>
                                <h4>Subscribe to our newsletter</h4>
                                <input type='email' placeholder='Subscribe to our newsletter' />
                                <button className='submit-button' type='submit'>Subscribe</button>
                            </form>
                        </div>
                    </div>
                    <img alt='logo' src={NavIcon}></img>
                    <p className='copyright'>© {year} Majda Majorski</p>
                </div>
            </footer>
        </>
    )
}
export default Footer;