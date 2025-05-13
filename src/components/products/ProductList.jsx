<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Paper,
  Typography,
  TextField,
  Box,
  Alert,
  Skeleton
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { deleteProduct, getProducts } from "../../services/api";
import toast from 'react-hot-toast';

export default function ProductList({ onEdit }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
=======
import { Table, TableHead, TableRow, TableCell, TableBody, Button, Paper, Typography, TextField, Box} from "@mui/material"
import { useEffect, useState} from "react"
import { useNavigate } from "react-router-dom"
import { deleteProduct, getProducts } from "../../services/product-service"

export default function ProductList(){
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilterProducts] = useState([]);
    const [ searchTerm, setSearchTerm ] = useState( ' ');
    const navigate = useNavigate();
    const [isAdmin] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await getProducts();
            if(Array.isArray(response)){
                setProducts(response);
                setFilterProducts(response);
            }else{
                console.error("Error al cargar Productos:", response);
            }
         };
         fetchProducts();
        
        }, []);

        useEffect(() => {
            if (searchTerm.trim()) {  //
              const searchTermLower = searchTerm.toLowerCase();
              const results = products.filter(product => {
                if (!product) return false
                return (
                  (product.nameProduct && product.name.toLowerCase().includes(searchTermLower)) &&
                  (product.category && product.category.toLowerCase().includes(searchTermLower)) &&
                  (product.stock && product.price.toString().includes(searchTerm))
                );
              });
              
              setFilterProducts(results);
            } else {
              setFilterProducts(products); 
            }
        }, [searchTerm, products]);

        const handleDelete =async (id) => {
            const confirm = window.confirm("Quieres eliminar este producto?");
            if(!confirm) return;
            try {
                await deleteProduct(id);
                setFilterProducts((prev) => prev.filter((p) => p.id !== id));      
            } catch (error) {
                alert("Error al eliminar el producto");
                console.error(error);
          }
 };

    return(
        <Paper
        elevation={4}
        sx={{
          mt: 4,
          mx: "auto",
          maxWidth: 1000,
          p: 4,
          background: "linear-gradient(to top, #f9f9f9, #ffffff)"
        }}
      >
        {/* Encabezado y botón de regreso */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h4" color="primary">
            Lista de Productos
          </Typography>
        </Box>
>>>>>>> 34e0fd5c9b5d8c4ac5065f3e1a957fbd10e64259
  
  // Obtener el rol del usuario del localStorage
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isAdmin = user.role === 'ADMIN';

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await getProducts();
      if (response.error) {
        throw new Error(response.message);
      }
      setProducts(response);
      setFiltered(response);
    } catch (err) {
      setError(err.message || 'Error al cargar productos');
      toast.error(err.message || 'Error al cargar productos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      setFiltered(
        products.filter(p =>
          p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.category?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFiltered(products);
    }
  }, [searchTerm, products]);

  const handleDelete = async (id) => {
    if (!window.confirm("¿Está seguro de eliminar este producto?")) return;
    
    try {
      const response = await deleteProduct(id);
      if (response.error) {
        throw new Error(response.message);
      }
      toast.success('Producto eliminado exitosamente');
      fetchProducts(); 
    } catch (err) {
      toast.error(err.message || 'Error al eliminar el producto');
      console.error('Error:', err);
    }
  };

  if (error) {
    return <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>;
  }

  return (
    <Paper 
      elevation={4} 
      sx={{ 
        mt: 4, 
        mx: "auto", 
        maxWidth: 1000, 
        p: 4, 
        background: "linear-gradient(to top, #f9f9f9, #ffffff)" 
      }}
    >
      <Box sx={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        mb: 3 
      }}>
        <Typography variant="h4" color="primary">
          Lista de Productos
        </Typography>
        {isAdmin && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/productos/newProduct")}
          >
            Agregar Producto
          </Button>
        )}
      </Box>

      <TextField
        label="Buscar Producto"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        sx={{ mb: 3 }}
      />

      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Nombre</strong></TableCell>
            <TableCell><strong>Categoría</strong></TableCell>
            <TableCell><strong>Precio</strong></TableCell>
            {isAdmin && <TableCell><strong>Acciones</strong></TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            [...Array(5)].map((_, index) => (
              <TableRow key={`skeleton-${index}`}>
                <TableCell><Skeleton animation="wave" /></TableCell>
                <TableCell><Skeleton animation="wave" /></TableCell>
                <TableCell><Skeleton animation="wave" /></TableCell>
                {isAdmin && <TableCell><Skeleton animation="wave" /></TableCell>}
              </TableRow>
            ))
          ) : filteredProducts.length === 0 ? (
            <TableRow>
<<<<<<< HEAD
              <TableCell colSpan={isAdmin ? 4 : 3} align="center">
                No se encontraron productos
              </TableCell>
            </TableRow>
          ) : (
            filteredProducts.map(product => (
              <TableRow key={product._id}>
                <TableCell>{product.name || "-"}</TableCell>
                <TableCell>{product.category || "-"}</TableCell>
                <TableCell>Q{product.price?.toFixed(2) || "-"}</TableCell>
                {isAdmin && (
                  <TableCell>
                    <Button 
                      variant="outlined"
                      color="primary" 
                      onClick={() => onEdit(product)}
                      sx={{ mr: 1 }}
                    >
                      Editar
                    </Button>
                    <Button 
                      variant="outlined"
                      color="error" 
                      onClick={() => handleDelete(product._id)}
                    >
                      Eliminar
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Paper>
  );
}
=======
              <TableCell><strong>Nombre</strong></TableCell>
              <TableCell><strong>Categoría</strong></TableCell>
              <TableCell><strong>Stock</strong></TableCell>
              {isAdmin && <TableCell><strong>Acciones</strong></TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.map((p) => {
              return (
                <TableRow key={p._id || p.id || someUniqueValue}> 
                  <TableCell>{p.nameProduct || "-"}</TableCell>
                  <TableCell>{p.category || "-"}</TableCell>
                  <TableCell>{p.stock || "-"}</TableCell>
                  {isAdmin && p.id?.length === 24 && (
                    <TableCell>
                      <Button onClick={() => navigate(`/productos/:${p.id}`)}>Editar</Button>
                      <Button color="error" onClick={() => handleDelete(p.id)}>
                        Eliminar
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
}
>>>>>>> 34e0fd5c9b5d8c4ac5065f3e1a957fbd10e64259
