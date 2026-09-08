const express = require('express');
const cors = require('cors');

const numerologyRoutes = require('./routes/numerology.routes');
const authRoutes = require('./routes/auth.routes');
const readingsRoutes = require('./routes/readings.routes');
const compatibilityRoutes = require('./routes/compatibility.routes');

const auditMiddleware = require('./middlewares/audit.middleware');
const errorMiddleware = require('./middlewares/error.middleware');

const app = express();

app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://numeria-frontend.onrender.com'
    ]
}));


app.use(express.json());

app.use(auditMiddleware);

app.use('/api/v1/auth', authRoutes);

app.use('/api/v1/numerology', numerologyRoutes);

app.use('/api/v1/readings', readingsRoutes);

app.use('/api/v1/compatibility', compatibilityRoutes);

app.get('/', (req, res) => {
    res.status(200).json({
        mensaje: 'API de Numerología en funcionamiento',
        estado: 'Online'
    });
});

app.use(errorMiddleware);

module.exports = app;
