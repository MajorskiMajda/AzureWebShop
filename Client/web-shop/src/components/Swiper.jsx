import React, { useState, useEffect } from 'react';
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "./styles/Swiper.css";
import Product from "./Product"

SwiperCore.use([Autoplay, Navigation]);

function SwiperComponent() {
    const [bestsellers, setBestsellers] = useState([]);

    useEffect(() => {
        const fetchBestsellers = async () => {
            try {
                const response = await fetch('https://azurewebshop.onrender.com/bestsellers');
                const data = await response.json();
                setBestsellers(data);
            } catch (err) {
                console.error('Error fetching bestsellers:', err);
            }
        };

        fetchBestsellers();
    }, []);

    return (
        <div className="swiper-container-wrapper">
            <div className="swiper-button-prev"></div>
            <Swiper
                spaceBetween={0}
                slidesPerView={4}
                centeredSlides={false}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                breakpoints={{
                    350: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                    780: {
                        slidesPerView: 2,
                        spaceBetween: 30,
                    },
                    1200: {
                        slidesPerView: 3,
                        spaceBetween: 40,
                    },
                    1504: {
                        slidesPerView: 4,
                        spaceBetween: 50,
                    },
                }}
                loop={true}
                navigation={{
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                }}
            >
                {bestsellers.map((item) => (
                    item.productId ? (
                        <SwiperSlide key={item._id}>
                            <Product
                                key={item.productId} 
                                id={item.productId._id}
                                name={item.productId.name}
                                description={item.productId.description}
                               image={item.productId.image}
                                price={(item.productId.priceCents/100).toFixed(2)}
                            />
                        </SwiperSlide>
                    ) : (
                        <SwiperSlide key={item._id}>
                            <div className="product-card">
                                <h3>Product Not Available</h3>
                            </div>
                        </SwiperSlide>
                    )
                ))}
            </Swiper>
            <div className="swiper-button-next"></div>
        </div>
    );
}

export default SwiperComponent;
