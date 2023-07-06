import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import { CartContext } from "../context/CartContext.jsx";

function Product() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(0);

    const [{ total }, setCart] = useContext(CartContext);

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

    function getProduct(id, signal) {
        return fetch(`http://localhost:3000/products/${id}`, { signal }).then(
            (response) => response.json()
        );
    }

    async function deleteProduct(id) {
        return await fetch(`http://localhost:3000/products/${id}`, {
            method: "delete",
        });
    }

    async function handleDelete() {
        await deleteProduct(productId);
        navigate("/");
    }

    if (!product) {
        return <h2>Loader.....</h2>;
    }

    function addProductToCart() {
        setCart({
            total: total + product.price * quantity,
        });
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <Typography sx={{ mb: 3 }} variant="h2" component="h1">
                {product.name}
            </Typography>

            <div>
                <p>{product.description}</p>
                <span>Price ${product.price}</span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <TextField
                    id="quantity"
                    label="Quantity"
                    variant="filled"
                    value={quantity}
                    onChange={(event) =>
                        setQuantity(
                            event.target.valueAsNumber < 0
                                ? 0
                                : event.target.valueAsNumber
                        )
                    }
                    type="number"
                    size="small"
                />
                <Button
                    onClick={addProductToCart}
                    sx={{ marginRight: 1 }}
                    variant="contained"
                    color="success"
                    size="large"
                >
                    Buy
                </Button>
            </div>

            <div>
                <Button
                    onClick={handleDelete}
                    sx={{ marginRight: 1 }}
                    variant="contained"
                    color="warning"
                >
                    Delete Product
                </Button>

                <Button sx={{ marginRight: 1 }} variant="contained">
                    <Link to={`/edit-product/${productId}`}>
                        Edit {product.name}
                    </Link>
                </Button>

                <Button
                    sx={{ marginRight: 1 }}
                    variant="contained"
                    color="success"
                >
                    <Link to="/">Back</Link>
                </Button>
            </div>
        </div>
    );
}

export default Product;
