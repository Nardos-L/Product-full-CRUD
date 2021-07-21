import React, { useEffect, useState } from "react";
import axios from "axios";
import { navigate } from "@reach/router";

const Product = (props) => {
    const [product, setProduct] = useState(null);

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/products/" + props.id)
            .then((res) => {
                setProduct(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [props.id]);

    const handleDelete = (delId) => {
        axios
            .delete("http://localhost:5000/api/products/" + delId)
            .then((res) => {
                navigate("/products");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    if (product === null) {
        return "Loading...";
    }

    return (
        <div>
            <h2>Single Product View</h2>
            <div style={{ width: "75%", margin: "0 auto", padding: "20px" }}>
                <h3>Title: {product.title}</h3>
                <p>Price: {product.price}</p>
                <p>Description: {product.description}</p>
                <div>
                    <span
                        onClick={(e) => {
                            handleDelete(product._id);
                        }}
                        style={{ color: "red", cursor: "pointer" }}
                    >
                        &#10006;
                    </span>


                </div>
            </div>
        </div>
    );
};

export default Product;