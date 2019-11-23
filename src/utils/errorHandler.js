const NotFound = (message) => {
    const error = new Error()
    error.message = message || 'Not Found'
    error.statusCode = 404
  
    return error
  }
  
  const BadRequest = (message) => {
    const error = new Error()
    error.message = message || 'Bad Request'
    error.statusCode = 400
  
    return error
  }
  
  const InternalServerError = (message) => {
    const error = new Error()
    error.message = message || 'Internal Server Error'
    error.statusCode = 500
  
    return error
  }
  
  const Unauthorized = (message) => {
    const error = new Error()
    error.message = message || 'Unauthorized'
    error.statusCode = 401
  
    return error
  }
  
  const NotImplemented = (message) => {
    const error = new Error()
    error.message = message || 'Not Implemented'
    error.statusCode = 500
  
    return error
  }
  
  module.exports = {
    NotFound,
    BadRequest,
    InternalServerError,
    Unauthorized,
    NotImplemented
  }
  