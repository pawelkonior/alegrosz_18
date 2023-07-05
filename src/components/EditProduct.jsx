import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditProduct() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const controller = new AbortController();
        getProduct(productId, controller.signal).then((data) =>
            setProduct(data)
        );

        return () => {
            controller.abort();
        };
    }, [productId]);

    async function getProduct(id, signal) {
        const response = await fetch(`http://localhost:3000/products/${id}`, {
            signal,
        });
        return response.json();
    }

    function handleUpdateInputs(event) {
        setProduct({
            ...product,
            [event.target.name]: event.target.value,
        });
    }

    async function editProduct(id, data) {
        const response = await fetch(`http://localhost:3000/products/${id}`, {
            method: "put",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });

        return response.json();
    }

    function handleSubmit(event) {
        event.preventDefault();
        editProduct(productId, product).then(() => {
            navigate(`/product/${productId}`);
        });
    }

    if (!product) {
        return <h2>Loader...</h2>;
    }

    return (
        <div>
            <h1>Edit product: {product.name}</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={product.name}
                        onChange={handleUpdateInputs}
                    />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        name="description"
                        id="description"
                        cols="30"
                        rows="10"
                        value={product.description}
                        onChange={handleUpdateInputs}
                    />
                </div>
                <div>
                    <label htmlFor="price">Price:</label>
                    <input
                        type="number"
                        name="price"
                        id="price"
                        value={product.price}
                        onChange={handleUpdateInputs}
                    />
                </div>
                <div>
                    <label htmlFor="stockCount">Stock Count:</label>
                    <input
                        type="number"
                        name="stockCount"
                        id="stockCount"
                        value={product.stockCount}
                        onChange={handleUpdateInputs}
                    />
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
    );
}

export default EditProduct;
