import { Component } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Grid, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { editProduct, getProduct } from "../api/api.js";
import PropTypes from "prop-types";

class EditProduct extends Component {
    state = {
        product: null,
    };

    componentDidMount() {
        getProduct(this.props.id).then((product) => {
            this.setState({ product });
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        editProduct(this.props.id, this.state.product).then(() => {
            this.props.navigate(`/product/${this.props.id}`);
        });
    };

    handleUpdateInputs = (event) => {
        this.setState({
            product: {
                ...this.state.product,
                [event.target.name]: event.target.value,
            },
        });
    };

    render() {
        if (!this.state.product) {
            return <h2>Loader...</h2>;
        }

        const { product } = this.state;

        return (
            <Grid item xs={12} md={8}>
                <Typography sx={{ mb: 3 }} variant="h2" component="h1">
                    Edit product: {product.name}
                </Typography>
                <form
                    onSubmit={this.handleSubmit}
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
                            onChange={this.handleUpdateInputs}
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
                            onChange={this.handleUpdateInputs}
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
                            onChange={this.handleUpdateInputs}
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
                            onChange={this.handleUpdateInputs}
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
}

EditProduct.propTypes = {
    id: PropTypes.string.isRequired,
    navigate: PropTypes.func.isRequired,
};

function EditProductWrapper(props) {
    const { productId } = useParams();
    const navigate = useNavigate();

    return <EditProduct id={productId} navigate={navigate} {...props} />;
}

export default EditProductWrapper;
