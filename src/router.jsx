import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import Product from "./components/Product.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "product/:productId",
        element: <Product />,
    },
]);

export default router;
