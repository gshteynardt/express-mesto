const express = require('express');
const mongoose = require('mongoose');
const routers = require('./routes/index.js');
const bodyParser = require('body-parser');
const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', routers);

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(err.statusCode)
    .send({ message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message });
});

app.listen(PORT, () => {
  console.log(`server is running ${PORT}`);
});
