const express = require('express');
const router = express.Router();
const db = require('../bd/conexionbd');

router.post('/InsertarCuentaPersona', (req, res) => {
  const { usuario, contrasenia, telefono, rut, nombre, apellido } = req.body;
  db.query('CALL InsertarCuentaPersona(?, ?, ?, ?, ?, ?)', [usuario, contrasenia, telefono, rut, nombre, apellido], (err, results) => {
    if (err) {
      console.error('Error al insertar datos:', err);
      res.status(500).json({ error: 'Error al insertar datos.' });
    } else {
      console.log('Datos insertados correctamente');
      res.status(200).json({ message: 'Datos insertados correctamente' });
    }
  });
});


router.post('/ValidarLogin', (req, res) => {
  const { usuario, contrasenia } = req.body;
  db.query('CALL ValidarLogin(?, ?)', [usuario, contrasenia], (err, results) => {
    if (err) {
      console.error('Error al verificar credenciales:', err);
      res.status(500).json({ error: 'Error al verificar credenciales.' });
    } else {
      const resultado = results[0][0];

      if (resultado && resultado.respuesta === 1) {
        res.status(200).json({ message: 'Credenciales válidas' });
      } else if (resultado && resultado.respuesta === 0) {
        res.status(401).json({ error: 'Contraseña incorrecta' });
      } else {
        res.status(401).json({ error: 'Usuario no encontrado' });
      }
    }
  });
});
module.exports = router;
