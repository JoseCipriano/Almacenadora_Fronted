import React, { useState } from "react";
import useRegister from "../shared/hooks/useRegister/useRegister.jsx"; // Importación default
import PropTypes from "prop-types";
import "./Register.css";

export default function Register({ switchAuthHandler }) {
  const { register, isLoading } = useRegister();
  const [userData, setUserData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    phone: "",
    role: "CLIENT",
  });
  const [profilePicture, setProfilePicture] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      ...userData,
      profilePicture
    };

    const success = await register(formData);
    if (success) {
      switchAuthHandler();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="text"
          placeholder="Nombre"
          value={userData.name}
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, name: e.target.value }))
          }
          required
        />
        <input
          type="text"
          placeholder="Usuario"
          value={userData.username}
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, username: e.target.value }))
          }
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={userData.email}
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, email: e.target.value }))
          }
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={userData.password}
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, password: e.target.value }))
          }
          required
        />
        <input
          type="tel"
          placeholder="Teléfono (8 dígitos)"
          value={userData.phone}
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, phone: e.target.value }))
          }
          pattern="\d{8}"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="file-input"
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Registrando..." : "Registrarse"}
        </button>
      </form>
      <button onClick={switchAuthHandler} className="switch-auth-btn">
        ¿Ya tienes cuenta? Inicia sesión
      </button>
    </div>
  );
}

Register.propTypes = {
  switchAuthHandler: PropTypes.func.isRequired,
};
