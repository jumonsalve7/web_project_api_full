const express = require('express');
const mongoose = require('mongoose');

const { createUser, login } = require('./controllers/users');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const auth = require('./middlewares/auth');

const app = express();
const PORT = 3000;
const errorHandler = require('./middlewares/errorHandler');
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./utils/logger");

app.use(express.json());
app.use(requestLogger);


mongoose.connect('mongodb://localhost:27017/aroundb')
  .then(() => console.log('Conectado a MongoDB'))
  .catch((err) => console.error('Error al conectar a MongoDB:', err));

app.post('/signin', login);
app.post('/signup', createUser);



app.use(auth);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

// 404
app.use((req, res) => {
  res.status(404).json({
    message: 'Recurso solicitado no encontrado',
  });
});

app.use(errors());
app.use(errorLogger);

app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});