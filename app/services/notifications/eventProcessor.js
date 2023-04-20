const mylog = require('@mylo/mylog')
const { SQSActionDispatcher } = require('@mylo/queue-agent')
const options = require('../../common/options')
const sqs = require('../../common/sqs')

async function startProcessor () {
  const actionMap = new Map()

  actionMap.set('EXAMPLE_EVENT', require('./actionHandler/exampleHandler'))

  const dispatcher = new SQSActionDispatcher('example-event-processor', sqs, options.sqs.queueUrl, actionMap)

  dispatcher.poll()
    .catch((err) => {
      mylog.error(`dispatcher for queue: ${options.sqs.queueUrl} failed to poll`, err)
    })

  return dispatcher
}

module.exports = {
  startProcessor
}
