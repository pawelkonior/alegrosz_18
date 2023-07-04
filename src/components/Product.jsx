import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Product() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);

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

    if (!product) {
        return <h2>Loader.....</h2>;
    }

    return (
        <div>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <span>Price ${product.price}</span>
            <br />
            <Link to="/">Back</Link>
        </div>
    );
}

export default Product;
