const fsPromises = require('fs').promises;

module.exports = (pathUrl) => fsPromises.readFile(pathUrl, { encoding: 'utf8' })
  .then((file) => JSON.parse(file));
