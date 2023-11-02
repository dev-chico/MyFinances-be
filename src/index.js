const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const errorHandler = require('./app/middlewares/errorHandler');
require('express-async-errors');

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })
);
app.use(routes);
app.use(errorHandler);

app.listen(3001, () => console.log('Server started at http://localhost:3001'));
