import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert } from 'react-bootstrap';

function Registrar() {
    const [usuario, setUsuario] = useState('');
    const [contrasenia, setContrasenia] = useState('');
    const [telefono, setTelefono] = useState('');
    const [rut, setRut] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [registroExitoso, setRegistroExitoso] = useState(false);
    const [error, setError] = useState('');
    const [camposFaltantes, setCamposFaltantes] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const camposRequeridos = ['usuario', 'contrasenia', 'telefono', 'rut', 'nombre', 'apellido'];
        const camposFaltantes = [];

        camposRequeridos.forEach((campo) => {
            if (!eval(campo)) {
                camposFaltantes.push(campo);
            }
        });

        if (camposFaltantes.length > 0) {
            setError('Por favor, rellena todos los campos.');
            setCamposFaltantes(camposFaltantes);
            return;
        }

        try {
            const response = await axios.post('http://localhost:3001/api/InsertarCuentaPersona', {
                usuario,
                contrasenia,
                telefono,
                rut,
                nombre,
                apellido
            });

            if (response.status === 200) {
                console.log('Registro insertado exitosamente.');
                setRegistroExitoso(true);
                setError('');
                setCamposFaltantes([]);

                setUsuario('');
                setContrasenia('');
                setTelefono('');
                setRut('');
                setNombre('');
                setApellido('');

                setTimeout(() => {
                    setRegistroExitoso(false);
                }, 5000);
            } else {
                console.error('Error al insertar el registro.');
                setError('Error al insertar el registro.');
            }
        } catch (error) {
            console.error('Error en la llamada a la API:', error);
            setError('Error al insertar el registro. Verifica los campos faltantes.');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center align-items-center">
                <div className="col-md-6">
                    <h1 className="text-center mb-4">Formulario de Registro</h1>
                    {registroExitoso && (
                        <Alert variant="success" onClose={() => setRegistroExitoso(false)} dismissible>
                            Registro insertado exitosamente.
                        </Alert>
                    )}
                    {error && (
                        <Alert variant="danger">
                            {error}
                            {camposFaltantes.length > 0 && (
                                <div>
                                    <p>Campos faltantes:</p>
                                    <ul>
                                        {camposFaltantes.map((campo, index) => (
                                            <li key={index}>{campo}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </Alert>
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
                        <div className="form-group">
                            <label htmlFor="telefono">Teléfono:</label>
                            <input
                                type="text"
                                id="telefono"
                                value={telefono}
                                onChange={(e) => setTelefono(e.target.value)}
                                className="form-control mb-3"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="rut">RUT:</label>
                            <input
                                type="text"
                                id="rut"
                                value={rut}
                                onChange={(e) => setRut(e.target.value)}
                                className="form-control mb-3"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre:</label>
                            <input
                                type="text"
                                id="nombre"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                className="form-control mb-3"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="apellido">Apellido:</label>
                            <input
                                type="text"
                                id="apellido"
                                value={apellido}
                                onChange={(e) => setApellido(e.target.value)}
                                className="form-control mb-3"
                            />
                        </div>
                        <div className="form-group text-center">
                            <button type="submit" className="btn btn-primary btn-lg">
                                Registrar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Registrar; 