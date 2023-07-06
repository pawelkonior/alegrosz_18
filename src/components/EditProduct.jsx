import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Grid, TextField } from "@mui/material";
import Button from "@mui/material/Button";

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
        <Grid item xs={12} md={8}>
            <Typography sx={{ mb: 3 }} variant="h2" component="h1">
                Edit product: {product.name}
            </Typography>
            <form
                onSubmit={handleSubmit}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 15,
                }}
            >
                <div>
                    <TextField
                        id="name"
                        name="name"
                        label="Name"
                        variant="filled"
                        fullWidth
                        value={product.name}
                        onChange={handleUpdateInputs}
                    />
                </div>
                <div>
                    <TextField
                        id="description"
                        name="description"
                        label="Description"
                        variant="filled"
                        fullWidth
                        value={product.description}
                        onChange={handleUpdateInputs}
                        multiline
                    />
                </div>
                <div>
                    <TextField
                        id="price"
                        name="price"
                        label="Price"
                        variant="filled"
                        fullWidth
                        value={product.price}
                        onChange={handleUpdateInputs}
                        type="number"
                    />
                </div>
                <div>
                    <TextField
                        id="stockCount"
                        name="stockCount"
                        label="Stock count"
                        variant="filled"
                        fullWidth
                        value={product.stockCount}
                        onChange={handleUpdateInputs}
                        type="number"
                    />
                </div>
                <Button
                    sx={{ alignSelf: "flex-end" }}
                    variant="contained"
                    type="submit"
                >
                    Save
                </Button>
            </form>
        </Grid>
    );
}

export default EditProduct;
