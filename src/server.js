require('dotenv').config(); // <-- ¡Muy importante que esté en la línea 1!
const express = require('express');
const connectDB = require('./config/database'); // Asegúrate de que la ruta coincida con el nombre de tu archivo

// Inicializar la aplicación de Express
const app = express();

// Establecer la conexión a MongoDB Atlas
connectDB();

// Middleware fundamental para la API-first
app.use(express.json());

// Ruta base
app.get('/', (req, res) => {
    res.status(200).json({ 
        mensaje: 'API de Numerología en funcionamiento',
        estado: 'Online'
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});