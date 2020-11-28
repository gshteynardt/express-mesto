const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const cors = require('cors');
const { errors } = require('celebrate');

const { PORT = 3000 } = process.env;
const routers = require('./routes/index.js');
require('dotenv').config();
const { requestLogger, errorLogger } = require('./middlewares/logger');

app.use(cors());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(requestLogger);
app.use('/', routers);
app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  let { statusCode = 500, message } = err;
  if (err.errors) {
    statusCode = 409;
    message = err.message;
  }

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });

  next();
});

app.listen(PORT, () => {
  console.log(`server is running ${PORT}`);
});
