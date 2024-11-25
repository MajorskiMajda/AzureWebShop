import React, { useRef, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import './styles/Home.css';
import SwiperComponent from './Swiper';
import { Link } from 'react-router-dom';

const infoText = 'Lorem ipsum odor amet, consectetuer adipiscing elit. Efficitur curae elit pretium lacinia sodales accumsan mi. Eleifend suscipit elit porttitor rutrum proin. Habitasse himenaeos penatibus proin arcu maximus.'

function Home() {    
    const aboutRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        if (location.hash === "#about" && aboutRef.current) {
            aboutRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [location]);
    return (
        <>
            <div className='landing-page'>
                <div className='landing-text'>
                    <h1 className='hero'>Affordable Luxury</h1>
                    <div className='sub-hed'>Ready For Every Occasion</div>
                    <Link to="/jewelry">
                        <button className='shop-btn'>SHOP NOW</button>
                    </Link>
                </div>
                <img className='landing-img' alt='img' src='https://i.ibb.co/165vn6k/cropped-image-6.png'></img>
            </div>
            <div className='swiper-div'>
                <h2>Best Sellers</h2>
                <SwiperComponent />
            </div>
            <div>
                <div className='info-container-home'>
                    <img src="https://i.ibb.co/6P3MDx3/cropped-image-5.png" alt="gold-background01" border="0" />
                    <div className='text-container'>
                        <h2>Quality</h2>
                        <p>{infoText}</p>
                    </div>
                </div>
                <div className='info-container-home'>
                    <div className='text-container'>
                        <h2>24k Gold</h2>
                        <p>{infoText}</p>
                    </div>
                    <img src="https://i.ibb.co/wKMfpwX/cropped-image-1.png" alt="gold-background01" border="0" />
                </div>
                <div className='info-container-home'>
                    <img src="https://i.ibb.co/NpJyb5h/cropped-image-4.png" alt="cropped-image-4" border="0" />
                    <div className='text-container'>
                        <h2>Sustainability</h2>
                        <p>{infoText}</p>
                    </div>
                </div>
                <div className='info-container-home'>
                    <div className='text-container'>
                        <h2>925 Silver</h2>
                        <p>{infoText}</p>
                    </div>
                    <img src="https://i.ibb.co/KF1Msdq/cropped-image-3.png" alt="gold-background01" border="0" />
                </div>
            </div>
            <div ref={aboutRef} id='about' className='fourth-div'>
                <img src="https://i.ibb.co/KmhNk9n/cropped-image-2.png" alt="gold-background01" border="0" />
                <div  className='text-container abt'>
                    <h2>About Us</h2>
                    <p>{infoText}</p>
                </div>
            </div>
        </>
    )
}
export default Home;