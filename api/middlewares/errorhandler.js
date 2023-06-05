//Este es un middleware que detecta un error
function logErrors (err, req, res, next) {
  console.log('consoleError');
  console.error(err);
  next(err);
}
//Se crea el middleware que detecta los boomErrors
function boomErrorHandler (err, req, res, next) {
  if (err.isBoom) {
    const {output} = err;
    res.status(output.statusCode).json(output.payload);
  }else{
    next(err);
  }
}
//Este es un middleware que detecta un error y además crea un formato para devolverselo al cliente
function errorHandler (err, req, res, next) {
  console.log('ErrorHandler');
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  })
}

module.exports = {
  logErrors,
  errorHandler,
  boomErrorHandler
}
