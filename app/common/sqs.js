const AWS = require('aws-sdk')
const options = require('./options')
const mylog = require('@mylo/mylog')

module.exports = (function () {
  const sqs = new AWS.SQS({ ...options.sqs })
  sqs.listQueues().promise()
    .then(() => {
      mylog.debug('sqs connected')
    })
    .catch(mylog.error)
  return sqs
})()
