import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddProduct() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [stockCount, setStockCount] = useState("");

    const navigate = useNavigate();

    async function handleAddProduct(event) {
        event.preventDefault();
        const product = await addProduct({
            name,
            description,
            price,
            stockCount,
        });
        navigate(`/product/${product.id}`);
    }

    async function addProduct(data) {
        const response = await fetch("http://localhost:3000/products", {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });

        return response.json();
    }

    return (
        <div>
            <h1>Add new product</h1>
            <form onSubmit={handleAddProduct}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                        name="description"
                        id="description"
                        cols="30"
                        rows="10"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        name="price"
                        id="price"
                        value={price}
                        placeholder="Type price"
                        onChange={(event) => setPrice(event.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="stockCount">Stock count</label>
                    <input
                        type="number"
                        name="stockCount"
                        id="stockCount"
                        value={stockCount}
                        onChange={(event) => setStockCount(event.target.value)}
                    />
                </div>
                <button type="submit">Add product</button>
            </form>
        </div>
    );
}

export default AddProduct;
