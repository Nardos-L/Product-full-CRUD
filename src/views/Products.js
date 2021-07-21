import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "@reach/router";

const Products = (props) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/products")
            .then((res) => {
                setProducts(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleDelete = (delId) => {
        axios
            .delete("http://localhost:5000/api/products/" + delId)
            .then((res) => {
                // At this point it is deleted from DB but we need to cause a re-render to remove it from the page.
                const filteredProducts = products.filter((product) => {
                    return product._id !== delId;
                });

                setProducts(filteredProducts);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div>
            <h3>All Products</h3>
            {products.map((product) => {
                return (
                    <div
                        key={product._id}
                        style={{ width: "75%", margin: "0 auto", padding: "20px" }}
                    >
                        <h3>
                            <Link to={"/products/" + product._id}>{product.title}</Link>
                        </h3>
                        <p>{product.description}</p>
                        <p>{product.title}</p>
                        <div>
                            <span
                                onClick={(e) => {
                                    handleDelete(product._id);
                                }}
                                style={{ color: "red", cursor: "pointer" }}
                            >
                                &#10006;
                            </span>
                            <Link
                                to={`/products/${product._id}/edit`}
                                className="btn btn-sm btn-outline-warning mx-1"
                            >
                                Edit
                            </Link>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Products;