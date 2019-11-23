const fs = require('fs')

function statusMethod (method, error) {
  switch (String(method).toLowerCase()) {
    case 'post':
      return error ? 404 : 201
    case 'get':
      return error ? 404 : 200
    case 'put':
      return error ? 404 : 200
    case 'delete':
      return error ? 404 : 200
  }
  return 500
}

function editHeader (response, method, type, error) {
  response.statusCode = statusMethod(method, error)
  switch (type) {
    case 'txt':
      response.setHeader('Content-Type', 'text/sample')
      break
    case 'json':
      response.setHeader('Content-Type', 'application/json')
      break
    case 'pdf':
      response.setHeader('Content-Type', 'application/pdf')
      break
    default:
      response.setHeader('Content-Type', 'text/sample')
  }
}

class ResponseSucess {
  static txt (response, method, msg = '') {
    if (response) {
      editHeader(response, method, 'txt')
      response.end(msg)
    }
  }

  static json (response, method, json = {}) {
    if (response) {
      editHeader(response, method, 'json')
      response.json(json)
    }
  }

  static pdf (response, method, filePath) {
    if (response) {
      const stat = fs.statSync(filePath)
      response.setHeader('Content-Length', stat.size)
      response.setHeader('Content-Disposition', 'attachment; filename=imovel_informacao.pdf')
      editHeader(response, method, 'pdf')

      const file = fs.createReadStream(filePath)
      file.pipe(response)
    }
  }
}

module.exports = {
  sucess: ResponseSucess
}
