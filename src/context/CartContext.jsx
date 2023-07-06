import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const CartContext = createContext({});

function CartProvider({ children }) {
    const cart = useState({ total: 0 });

    return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
}

CartProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default CartProvider;
