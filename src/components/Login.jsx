import React, { useState } from "react";
import { useLogin } from "../shared/hooks/useLogin.jsx"; // Ruta corregida
import PropTypes from "prop-types";


export default function Login({ switchAuthHandler }) {
  const { login, isLoading } = useLogin();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(credentials);
  };

  return (
    <div className="auth-form-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="text"
          placeholder="Usuario"
          value={credentials.username}
          onChange={(e) =>
            setCredentials((prev) => ({
              ...prev,
              username: e.target.value,
            }))
          }
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={credentials.password}
          onChange={(e) =>
            setCredentials((prev) => ({
              ...prev,
              password: e.target.value,
            }))
          }
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
        </button>
      </form>
      <button onClick={switchAuthHandler} className="switch-auth-btn">
        ¿No tienes cuenta? Regístrate
      </button>
    </div>
  );
}

Login.propTypes = {
  switchAuthHandler: PropTypes.func.isRequired,
};