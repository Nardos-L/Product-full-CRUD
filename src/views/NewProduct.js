import React, { useState } from "react";
import axios from "axios";
import { navigate } from "@reach/router";

const NewProduct = (props) => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");

    const [errors, setErrors] = useState(null);

    const handleNewProductSubmit = (event) => {
        event.preventDefault();

        const newProduct = {
            title: title,
            price: price,
            description: description,
        };

        axios
            .post("http://localhost:5000/api/products", newProduct)
            .then((res) => {
                navigate("/products/" + res.data._id);
            })
            .catch((err) => {
                console.log(err);
                setErrors(err.response?.data?.errors);
            });
    };

    return (
        <div className="w-50 p-4 rounded mx-auto ">
            <h3 className="text-center">Product Manger</h3>
            <form
                onSubmit={(e) => {
                    handleNewProductSubmit(e);
                }}
            >
                <div className="form-group">
                    <label className="h6">Title: </label>
                    {errors?.title && (
                        <span style={{ color: "red" }}>{errors.title.message}</span>
                    )}
                    <input className="form-control"
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                        type="text"
                    />
                </div>

                <div className="form-group">
                    <label className="h6">Price: </label>
                    {errors?.price && (
                        <span style={{ color: "red" }}>{errors.price.message}</span>
                    )}
                    <input className="form-control"
                        onChange={(e) => {
                            setPrice(e.target.value);
                        }}
                        type="number" min="1"
                    />
                </div>
                <div className="form-group">
                    <label className="h6">Description: </label>
                    {errors?.description && (
                        <span style={{ color: "red" }}>{errors.description.message}</span>
                    )}
                    <textarea className="form-control" name="" id="" cols="30" rows="10" type="text"
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}
                        type="text"
                    />
                </div>
                <input className="btn btn-sm btn-outline-success mt-2" type="submit" />
            </form>
        </div>
    );
};

export default NewProduct;