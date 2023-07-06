import { useEffect, useState } from "react";

import ProductCard from "./ProductCard.jsx";
import Box from "@mui/material/Box";

function Products() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        getData(controller.signal).then((data) => setProducts(data));

        return () => {
            controller.abort();
        };
    }, []);

    function getData(signal) {
        return fetch("http://localhost:3000/products", { signal }).then(
            (response) => response.json()
        );
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 3,
                justifyContent: "center",
            }}
        >
            {products.map((product) => (
                <ProductCard
                    name={product.name}
                    price={`${product.price}`}
                    key={product.id}
                    id={product.id}
                />
            ))}
        </Box>
    );
}

export default Products;
