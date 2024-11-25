import React, { useEffect, useState } from "react";
import "./styles/Jewelry.css";
import Product from "./Product";

function Products() {
    const [productCategories, setProductCategories] = useState([]); 

    useEffect(() => {
        window.scrollTo(0, 0); 

        const fetchProducts = async () => {
            try {
                const response = await fetch("https://azurewebshop.onrender.com/products"); 
                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }

                const products = await response.json();

                const categories = products.reduce((acc, product) => {
                    const { category } = product;

                    if (!acc[category]) {
                        acc[category] = [];
                    }

                    acc[category].push(product);

                    return acc;
                }, {});

                const formattedCategories = Object.entries(categories).map(([category, products]) => ({
                    category,
                    products,
                }));

                setProductCategories(formattedCategories);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <>
            {productCategories.map((category) => (
                <div className="container-pr" key={category.category}>
                    <h1 className="category-name">{category.category.charAt(0).toUpperCase() + category.category.slice(1)}s</h1>
                    <div className='prod-container'>
                        {category.products.map((product) => (
                            <Product
                                key={product._id} 
                                id={product._id}
                                name={product.name}
                                description={product.description}
                                image={product.image}
                                price={(product.priceCents/100).toFixed(2)}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </>
    );
}

export default Products;

