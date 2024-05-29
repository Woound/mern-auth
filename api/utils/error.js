// In some cases, we would like to implement our own custom error handler
// Below is an example of how we could do that

const errorHandler = (statusCode, message) => {
  const error = new Error()
  error.statusCode = statusCode
  error.message = message
  return error
}

module.exports = errorHandler
