import { useState, useEffect } from 'react';
import { getCurrentUser } from '../../services/api';

export function useUserDetails() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUserDetails = async () => {
      try {
        const userData = getCurrentUser();
        if (userData) {
          setUser(userData);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadUserDetails();
  }, []);

  return { user, loading, error };
}

export default useUserDetails;
