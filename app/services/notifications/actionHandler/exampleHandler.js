const mylog = require('@mylo/mylog')

/* This is the event action handler
* it takes a JSON event body sent via SQS like:
* {
*   "action": "EXAMPLE_EVENT",
*   "object": "the reference object to do work with",
*   "objectId": "the actionable object id to do work with",
* }
*
* And runs any customized "action" on top of that event like below:
* */

module.exports = async function action (messageBody) {
  mylog.info('an action handler', messageBody)
}
