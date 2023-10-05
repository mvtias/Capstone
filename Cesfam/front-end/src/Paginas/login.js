import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Alert } from 'react-bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
  const [usuario, setUsuario] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [error, setError] = useState('');
  const [exito, setExito] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

   
    if (!usuario || !contrasenia) {
      setError('Por favor, rellena todos los campos.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/api/ValidarLogin', {
        usuario,
        contrasenia,
      });

      if (response.status === 200) {
        setExito(true);
        setError('');
        setTimeout(() => {
          setExito(false);
        }, 5000);
      } else {
        setError('Credenciales inválidas');
      }
    } catch (error) {
      console.error('Error en la llamada a la API:', error);
      setError('Error al iniciar sesión. Verifica tus credenciales.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center align-items-center">
        <div className="col-md-6">
          <h1 className="text-center mb-4">Iniciar Sesión</h1>
          {exito && (
            <Alert variant="success" onClose={() => setExito(false)} dismissible>
              Inicio de sesión exitoso.
            </Alert>
          )}
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="usuario">Usuario:</label>
              <input
                type="text"
                id="usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                className="form-control mb-3"
              />
            </div>
            <div className="form-group">
              <label htmlFor="contrasenia">Contraseña:</label>
              <input
                type="password"
                id="contrasenia"
                value={contrasenia}
                onChange={(e) => setContrasenia(e.target.value)}
                className="form-control mb-3"
              />
            </div>
            <div className="form-group text-center">
              <button type="submit" className="btn btn-primary btn-lg">
                Iniciar Sesión
              </button>
            </div>
          </form>
          <div className="text-center mt-3">
            <Link to="/registro" className="btn btn-primary btn-lg">
              Registrarse
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
