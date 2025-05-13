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

<<<<<<< HEAD
Login.propTypes = {
  switchAuthHandler: PropTypes.func.isRequired,
};
=======
    });

    const handleInputValueChange = (value , field) => {
        setFormState((prevState) => ({
            ...prevState, 
            [field]: {
                ...prevState[field], 
                value
            }
        }));

    }

    const handleInputValidationOnBlur = (value, field) => {
        let isValid = false;
        switch (field) {
            case 'email':
                isValid = validateEmail(value);
                break;
            case 'password':
                isValid = validatePassword(value);
                break;
            default:
                break;
        }
        setFormState((prevState) =>({
            ...prevState, 
            [field]: {
                ...prevState[field], 
                isValid, 
                showError: !isValid
            }
        }));
    }

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await login(formState.email.value, formState.password.value);
        
            if (response && response.token) {
                const userData = {
                    token: response.token,
                    ...(response.user && { user: response.user })
                };
                localStorage.setItem('user', JSON.stringify(userData));
                console.log(response.token)
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    }

    const isSubmitButtonDisabled = isLoading || !formState.email.isValid || !formState.password.isValid;

    return (
        <div className= "login-container">
            < Logo text={'Login Almacenadora '}/>
            <form className="auth-form">
                <Input
                    field = 'email'
                    label = 'Email'
                    value = {formState.email.value}
                    onChangeHandler = {handleInputValueChange}
                    type = 'text'
                    onBlurHandler = {handleInputValidationOnBlur}
                    showErrorMessage = {formState.email.showError}
                    validationMessage = {emailValidationMessage}
                
                />
                <Input
                    field = 'password'
                    label = 'Password'
                    value = {formState.password.value}
                    onChangeHandler = {handleInputValueChange}
                    type = 'password'
                    onBlurHandler = {handleInputValidationOnBlur}
                    showErrorMessage = {formState.password.showError}
                    validationMessage = {validatePasswordMessage}
                
                />
                <button onClick = {handleLogin} disabled = {isSubmitButtonDisabled}>
                        Log in
                </button>

            </form>
            <span onClick={switchAuthHandler} className="auth-form-switch-label">
                No tienes cuenta? 
            </span>

        </div>
    )
 }
>>>>>>> 34e0fd5c9b5d8c4ac5065f3e1a957fbd10e64259
