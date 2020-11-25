const express = require('express');
const mongoose = require('mongoose');
const routers = require('./routes/index.js');
const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', routers);

app.listen(PORT, () => {
  console.log(`server is running ${PORT}`);
});
