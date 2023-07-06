import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Chip } from "@mui/material";

import imagePlaceholder from "../assets/product-placeholder.png";

export default function ProductCard({ name, price, id }) {
    return (
        <Card sx={{ maxWidth: 345, flexGrow: 1, width: "100%" }}>
            <CardMedia
                sx={{ height: 345 }}
                image={imagePlaceholder}
                title={name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
                <Typography
                    variant="body2"
                    component="div"
                    color="text.secondary"
                >
                    <Chip label={`$${price}`} />
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">
                    <Link to={`/product/${id}`}>Details</Link>
                </Button>
            </CardActions>
        </Card>
    );
}

ProductCard.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
};
