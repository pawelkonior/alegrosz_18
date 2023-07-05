import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import Product from "./components/Product.jsx";
import AddProduct from "./components/AddProduct.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "product/:productId",
        element: <Product />,
    },
    {
        path: "add-product",
        element: <AddProduct />,
    },
]);

export default router;
