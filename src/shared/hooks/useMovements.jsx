import { useState, useCallback, useEffect } from 'react';
import { api } from '../services/api';

export const useMovements = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [movements, setMovements] = useState([]);

    const fetchMovements = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const { data } = await api.get('/movements');
            setMovements(data);
            return data;
        } catch (error) {
            setError(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    }, []);

    const createMovement = useCallback(async (movementData) => {
        try {
            setLoading(true);
            setError(null);

            // Validar datos requeridos
            const requiredFields = ['type', 'productId', 'quantity'];
            const missingFields = requiredFields.filter(field => !movementData[field]);

            if (missingFields.length > 0) {
                throw new Error(`Campos requeridos: ${missingFields.join(', ')}`);
            }

            const { data } = await api.post('/movements/create', movementData);
            setMovements(prev => [...prev, data]);
            return data;
        } catch (error) {
            setError(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    }, []);

    const getMovementsByDate = useCallback(async (startDate, endDate) => {
        try {
            setLoading(true);
            setError(null);
            const { data } = await api.get(`/movements/byDate`, {
                params: { startDate, endDate }
            });
            return data;
        } catch (error) {
            setError(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    }, []);

    const getMovementsByProduct = useCallback(async (productId) => {
        try {
            setLoading(true);
            setError(null);
            const { data } = await api.get(`/movements/byProduct/${productId}`);
            return data;
        } catch (error) {
            setError(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMovements();
    }, [fetchMovements]);

    return {
        movements,
        loading,
        error,
        fetchMovements,
        createMovement,
        getMovementsByDate,
        getMovementsByProduct
    };
};

export default useMovements;