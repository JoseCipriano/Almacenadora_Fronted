// src/shared/services/api.js

import axios from 'axios';

// Obtiene fecha y usuario actuales
const getCurrentDateTime = () => {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ` +
         `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
};
const getCurrentUser = () => localStorage.getItem('user') ?? 'aarbizu-2020398';

// Configuración de Axios
const apiClient = axios.create({
  baseURL: 'http://localhost:3000/Almacenadora_app/v1',
  timeout: 5000,
  headers: {
    Accept: 'application/json',
    'Cache-Control': 'no-cache'
  },
  withCredentials: true // permitir envío de cookies/credenciales
});

// Interceptor de peticiones: añade token y metadatos
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (['post', 'put'].includes(config.method?.toLowerCase())) {
      const metadata = {
        createdAt: getCurrentDateTime(),
        createdBy: getCurrentUser(),
        lastModifiedAt: getCurrentDateTime(),
        lastModifiedBy: getCurrentUser()
      };

      if (config.data instanceof FormData) {
        Object.entries(metadata).forEach(([key, value]) => {
          config.data.append(key, value);
        });
      } else {
        config.data = { ...config.data, ...metadata };
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de respuestas: logout si 401
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Manejador de errores uniforme
const handleError = (error, defaultMessage) => ({
  error: true,
  message: error.response?.data?.message || defaultMessage,
  timestamp: getCurrentDateTime(),
  status: error.response?.status || 500,
  user: getCurrentUser()
});

// Servicios de autenticación
const authService = {
  login: async (credentials) => {
    try {
      const response = await apiClient.post('/auth/login', credentials);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      return handleError(error, 'Error al iniciar sesión');
    }
  },

  register: async (formData) => {
    try {
      // Endpoint corregido a /auth/signup
      const response = await apiClient.post(
        '/auth/signup',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          timeout: 10000
        }
      );
      return response.data;
    } catch (error) {
      return handleError(error, 'Error al registrar usuario');
    }
  }
};

// Servicios de categorías
const categoryService = {
  getCategories: async () => {
    try {
      const response = await apiClient.get('/categories');
      return response.data;
    } catch (error) {
      return handleError(error, 'Error al obtener categorías');
    }
  },
  createCategory: async (categoryData) => {
    try {
      const response = await apiClient.post('/categories/addCategory', categoryData);
      return response.data;
    } catch (error) {
      return handleError(error, 'Error al crear categoría');
    }
  },
  updateCategory: async (id, categoryData) => {
    try {
      const response = await apiClient.put(`/categories/${id}`, categoryData);
      return response.data;
    } catch (error) {
      return handleError(error, 'Error al actualizar categoría');
    }
  },
  deleteCategory: async (id) => {
    try {
      const response = await apiClient.delete(`/categories/${id}`);
      return response.data;
    } catch (error) {
      return handleError(error, 'Error al eliminar categoría');
    }
  }
};

// Servicios de productos
const productService = {
  getProducts: async (filters = {}) => {
    try {
      const response = await apiClient.get('/products', { params: filters });
      return response.data;
    } catch (error) {
      return handleError(error, 'Error al obtener productos');
    }
  },
  createProduct: async (productData) => {
    try {
      const response = await apiClient.post(
        '/products/newProduct',
        productData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          timeout: 10000
        }
      );
      return response.data;
    } catch (error) {
      return handleError(error, 'Error al crear producto');
    }
  },
  updateProduct: async (id, productData) => {
    try {
      const response = await apiClient.put(
        `/products/${id}`,
        productData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          timeout: 10000
        }
      );
      return response.data;
    } catch (error) {
      return handleError(error, 'Error al actualizar producto');
    }
  },
  deleteProduct: async (id) => {
    try {
      const response = await apiClient.delete(`/products/${id}`);
      return response.data;
    } catch (error) {
      return handleError(error, 'Error al eliminar producto');
    }
  }
};

// Servicios de movimientos
const movementService = {
  getMovements: async (filters = {}) => {
    try {
      const response = await apiClient.get('/movements', { params: filters });
      return response.data;
    } catch (error) {
      return handleError(error, 'Error al obtener movimientos');
    }
  },
  createMovement: async (movementData) => {
    try {
      const response = await apiClient.post('/movements/create', movementData);
      return response.data;
    } catch (error) {
      return handleError(error, 'Error al crear movimiento');
    }
  }
};

// Servicios de proveedores
const supplierService = {
  getSuppliers: async () => {
    try {
      const response = await apiClient.get('/suppliers');
      return response.data;
    } catch (error) {
      return handleError(error, 'Error al obtener proveedores');
    }
  },
  createSupplier: async (supplierData) => {
    try {
      const response = await apiClient.post(
        '/suppliers/create',
        supplierData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          timeout: 10000
        }
      );
      return response.data;
    } catch (error) {
      return handleError(error, 'Error al crear proveedor');
    }
  },
  updateSupplier: async (id, supplierData) => {
    try {
      const response = await apiClient.put(
        `/suppliers/${id}`,
        supplierData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          timeout: 10000
        }
      );
      return response.data;
    } catch (error) {
      return handleError(error, 'Error al actualizar proveedor');
    }
  },
  deleteSupplier: async (id) => {
    try {
      const response = await apiClient.delete(`/suppliers/${id}`);
      return response.data;
    } catch (error) {
      return handleError(error, 'Error al eliminar proveedor');
    }
  }
};

// Servicios de clientes
const clientService = {
  getClients: async () => {
    try {
      const response = await apiClient.get('/clients');
      return response.data;
    } catch (error) {
      return handleError(error, 'Error al obtener clientes');
    }
  },
  createClient: async (clientData) => {
    try {
      const response = await apiClient.post('/clients/create', clientData);
      return response.data;
    } catch (error) {
      return handleError(error, 'Error al crear cliente');
    }
  },
  updateClient: async (id, clientData) => {
    try {
      const response = await apiClient.put(`/clients/${id}`, clientData);
      return response.data;
    } catch (error) {
      return handleError(error, 'Error al actualizar cliente');
    }
  },
  deleteClient: async (id) => {
    try {
      const response = await apiClient.delete(`/clients/${id}`);
      return response.data;
    } catch (error) {
      return handleError(error, 'Error al eliminar cliente');
    }
  }
};

// Exportar servicios
export const { login, register } = authService;
export const {
  getCategories, createCategory, updateCategory, deleteCategory
} = categoryService;
export const {
  getProducts, createProduct, updateProduct, deleteProduct
} = productService;
export const {
  getMovements, createMovement
} = movementService;
export const {
  getSuppliers, createSupplier, updateSupplier, deleteSupplier
} = supplierService;
export const {
  getClients, createClient, updateClient, deleteClient
} = clientService;

// Exporta el objeto completo si lo necesitas
export const api = {
  ...authService,
  ...categoryService,
  ...productService,
  ...movementService,
  ...supplierService,
  ...clientService
};

export default api;
