require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./utils/logger'); // Logger también arriba

const app = express(); 

// 🏁 AHORA IMPORTA LOS CONTROLADORES Y RUTAS
const { createUser, login } = require('./controllers/users');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');

const PORT = process.env.PORT || 3000;

// Configuración de CORS
// Permitir solo tu dominio de producción para mayor seguridad
const allowedOrigins = [
  'https://socialmed.vitdam.org',
  'http://socialmed.vitdam.org',
  'http://localhost:3000' // Opcional, por si haces pruebas locales
];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

// Responder a las peticiones pre-flight (OPTIONS)
app.options('*', cors());

app.use(express.json());

// Logger de solicitudes (debe ir antes de las rutas)
app.use(requestLogger);

// Conexión a Base de Datos
const DB_URL = process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/aroundb';
mongoose.connect(DB_URL)
  .then(() => console.log('Conectado a MongoDB'))
  .catch((err) => console.error('Error al conectar a MongoDB:', err));

// Rutas Públicas
app.post('/signin', login);
app.post('/signup', createUser);

// Middleware de Autorización (Protege las rutas de abajo)
app.use(auth);

// Rutas Protegidas
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).json({
    message: 'Recurso solicitado no encontrado',
  });
});

// Logger de errores (debe ir después de las rutas y antes de los manejadores de errores)
app.use(errorLogger);

// Manejador de errores de Celebrate
app.use(errors());

// Manejador de errores centralizado (debe ser el último middleware)
app.use(errorHandler);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});