const { errors, HttpStatus } = require('@mylo/service-common')

class CustomError extends errors.MyloError {
  constructor (message, metaData, rootError) {
    super(message, metaData, rootError)
    this.statusCode = HttpStatus.INTERNAL_SERVER_ERROR
  }
}

module.exports = {
  CustomError,
  ...errors
}
