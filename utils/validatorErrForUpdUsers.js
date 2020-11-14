const validatorErr = (inputErr, response) => {
  if (inputErr.name === 'CastError') {
    return response.status(400).send({ message: 'Переданы некорректные данные' });
  } if (inputErr.message === 'NotFound') {
    return response.status(404).send({ message: 'Объект не найден' });
  } if (inputErr.name === 'ValidationError') {
    response.status(404).send({ message: 'Переданы некорректные данные' });
  } else {
    response.status(500).send({ message: 'Ошибка сервера' });
  }
  return null;
};

module.exports = validatorErr;
