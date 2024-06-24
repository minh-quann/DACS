import React from 'react';
import '../css/CardProduct.css'

const CardProduct = ({ data }) => {
    if (!data || data.length === 0) {
        return <p>No data to display</p>;
    }

    return (
        <div className="card-data">
            {data.map((item, index) => (
                <div key={index} className="product-card">
                    <div className="product-image">
                        <img src={item.thumb_url} alt={item.title}  />
                    </div>

                    <div className="product-content">
                        <h2 className="product-title">{item.title}</h2>
                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="product-link">
                            <button className="product-button">View Product</button>
                        </a>
                    </div>

                </div>
            ))}
        </div>
    );
};

export default CardProduct;
