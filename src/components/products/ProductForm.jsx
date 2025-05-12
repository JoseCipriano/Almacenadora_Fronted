import { useState, useEffect } from "react";

const ProductForm = ({ onSave, editProduct }) => {
    const [product, setProduct] = useState({
        name: "",
        price: "",
        category: "",
        quantity: 0,
    });

    useEffect(() => {
        if (editProduct) {
            setProduct(editProduct); 
        }
    }, [editProduct]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(product); 
        setProduct({ name: "", price: "", category: "", quantity: 0 });
    };

    return (
        <form onSubmit={handleSubmit} className="product-form">
            <input
                type="text"
                name="name"
                value={product.name}
                onChange={handleInputChange}
                placeholder="Nombre del Producto"
                required
            />
            <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleInputChange}
                placeholder="Precio"
                required
            />
            <input
                type="text"
                name="category"
                value={product.category}
                onChange={handleInputChange}
                placeholder="Categoría"
                required
            />
            <input
                type="number"
                name="quantity"
                value={product.quantity}
                onChange={handleInputChange}
                placeholder="Cantidad"
                required
            />
            <button type="submit">
                {editProduct ? "Guardar cambios" : "Agregar Producto"}
            </button>
        </form>
    );
};

export default ProductForm;
