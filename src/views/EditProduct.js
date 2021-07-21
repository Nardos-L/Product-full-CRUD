import React, { useEffect, useState } from "react";
import { navigate } from "@reach/router";
import axios from "axios";

const EditProduct = (props) => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");

    const [errors, setErrors] = useState(null);

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/products/" + props.id)
            .then((res) => {
                console.log(res);
                setTitle(res.data.title);
                setPrice(res.data.price);
                setDescription(res.data.description);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [props.id]);

    const handleEditProductonSubmit = (event) => {
        event.preventDefault();

        const editedProduct = {
            title: title,
            price: price,
            description: description,
        };

        axios
            .put(
                `http://localhost:5000/api/products/${props.id}`,
                editedProduct
            )
            .then((res) => {
                console.log(res);
                navigate("/products/" + props.id);
            })
            .catch((err) => {
                /* 
                This .catch only happens if the controller .catch has:
                res.status(400).json(err);
                */
                setErrors(err.response?.data?.errors);
                console.log(err);
            });
    };

    return (
        <div className="w-50 p-4 rounded mx-auto ">
            <h3 className="text-center">Product Manger</h3>
            <form onSubmit={handleEditProductonSubmit}>
                <div className="form-group">
                    <label className="h6">Title</label>
                    {errors?.title && (
                        <span className="text-danger">{errors?.title?.message}</span>
                    )}
                    <input className="form-control" type="text" name="title" onChange={(e) => setTitle(e.target.value)} value={title} />
                </div>
                <div className="form-group">
                    <label className="h6">Price</label>
                    {errors?.price && (
                        <span className="text-danger">{errors?.price?.message}</span>
                    )}
                    <input className="form-control" type="number" name="price" onChange={(e) => setPrice(e.target.value)} value={price} />
                </div>
                <div className="form-group">
                    <label className="h6">Description</label>
                    {errors?.description && (
                        <span className="text-danger">{errors?.description?.message}</span>
                    )}
                    <textarea className="form-control" name="description" id="" cols="30" rows="10" type="text" onChange={(e) => setDescription(e.target.value)} value={description} />
                </div>
                <input className="btn btn-sm btn-outline-success mt-2" type="submit" />
            </form >
        </div>
    );
};

export default EditProduct;