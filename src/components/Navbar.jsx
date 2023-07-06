import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext.jsx";

function Navbar() {
    const [{ total }, setCart] = useContext(CartContext);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        Alegrosz
                    </Typography>
                    <Button color="inherit">
                        <Link to="/">Products</Link>
                    </Button>
                    <Button color="inherit">
                        <Link to="add-product">Add Product</Link>
                    </Button>
                    {total > 0 && (
                        <>
                            <Typography
                                sx={{ mr: 1 }}
                                variant="h6"
                                component="div"
                            >
                                Cart: ${total}
                            </Typography>
                            <Button
                                onClick={() => setCart({ total: 0 })}
                                color="error"
                                variant="outlined"
                            >
                                Clear
                            </Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Navbar;
