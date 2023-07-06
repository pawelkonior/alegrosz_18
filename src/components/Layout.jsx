import Navbar from "./Navbar.jsx";
import { Outlet } from "react-router-dom";
import { Container, Grid } from "@mui/material";

function Layout() {
    return (
        <div>
            <Navbar />
            <Container fixed sx={{ flexGrow: 1, mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Outlet />
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default Layout;
