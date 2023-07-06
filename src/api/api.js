export async function getProduct(id) {
    const response = await fetch(`http://localhost:3000/products/${id}`);
    return response.json();
}

export async function editProduct(id, data) {
    const response = await fetch(`http://localhost:3000/products/${id}`, {
        method: "put",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    });

    return response.json();
}
