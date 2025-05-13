import axios from 'axios';

const apiClientProducts = axios.create({
    baseURL: "http://localhost:3000/Almacenadora_app/v1",
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

apiClientProducts.interceptors.request.use((config) => {
    const userData = localStorage.getItem("user");
    console.log('[Interceptor] User data from localStorage:', userData);
    
    if (!userData) {
        console.error('No hay datos de usuario en localStorage');
        return config;
    }

    try {
        const parsedUser = JSON.parse(userData);
        const token = parsedUser?.token;
        
        if (!token) {
            console.error('No se encontró token en los datos del usuario');
            return config;
        }

        config.headers.Authorization = `Bearer ${token}`;
        console.log('[Interceptor] Token añadido a los headers:', config.headers.Authorization);
        
        return config;
    } catch (error) {
        console.error('[Interceptor] Error al procesar datos de usuario:', error);
        return Promise.reject(error);
    }
});

// Función para obtener productos
export const getProducts = async () => {
    try {
        console.log('[getProducts] Iniciando petición...');
        const response = await apiClientProducts.get("/products/Category", {
            params: { status: true }
        });
        console.log('[getProducts] Respuesta recibida:', response);
        return response.data.products || [];
    } catch (err) {
        console.error('[getProducts] Error completo:', {
            message: err.message,
            response: err.response?.data,
            status: err.response?.status,
            config: {
                url: err.config?.url,
                headers: err.config?.headers
            }
        });
        throw err;
    }
};

// Función para eliminar producto
export const deleteProduct = async (id) => {
    try {
        console.log('[deleteProduct] Eliminando producto ID:', id);
        const response = await apiClientProducts.delete(`/products/${id}`);
        return response.data;
    } catch (err) {
        console.error('[deleteProduct] Error:', {
            message: err.message,
            response: err.response?.data,
            status: err.response?.status
        });
        throw err;
    }
};

/*
export const getProducts = async (name = null) => {
  try {
    const params = name ? { name } : {};
    const response = await apiClientProducts.get("/products/Name", { params });
    return response.data;
  } catch (err) {
    console.error("Error al obtener productos:", err);
    throw err;
  }
};
*/
/*
export const deleteProduct = async (id) => {
  try {
    await apiClientProducts.delete(`/products/${id}`);
  } catch (err) {
    console.error("Error al eliminar producto:", err);
    throw err;
  }
};

*/



export const createProduct = async (productData) => {
    try {
        const response = await axios.post(BASE_URL, productData, {headers: HEADERS});
        return response.data.product;
    } catch (error) {
        console.error("Error al crear producto", error.response?.data || error);
        throw error;
    }
};

export const getProductsByName = async (name) => {
    try {
        const response = await axios.get(`${BASE_URL}/search?name=${name}`, {headers: HEADERS});
        return response.data;
    } catch (error) {
        console.error("Error al buscar producto por nombre", error.response?.data || error);
        throw error;
        
    }
};

export const updateProduct = async (id, productData) => {
    try {
        const response = await axios.put(`${BASE_URL}/${id}`, productData, {headers: HEADERS});
        return response.data;
    } catch (error) {
        console.error("Error al actualizar el producto", error.response?.data || error);
        throw error; 
    } 
};

export const getLowStockProducts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/low-stock`, { headers: HEADERS });
      return response.data;
    } catch (error) {
      console.error("Error al obtener productos con poco stock", error.response?.data || error);
      throw error;
    }
  };



