const errorHandler = (err, req, res, next) => {
  const currentStatusCode = res.statusCode ? res.statusCode : 500;

  res.status(currentStatusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENVIRONNEMENT === 'production' ? null : err.stack,
  });
};

module.exports = {
  errorHandler,
};
