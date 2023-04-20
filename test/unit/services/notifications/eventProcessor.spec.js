/* global describe, beforeEach, it, expect */
const queueAgent = require('@mylo/queue-agent')
const eventProcessor = require('../../../../app/services/notifications/eventProcessor')
const mylog = require('@mylo/mylog')

require('../../../support/node')

describe('eventProcessor', function () {
  describe('startProcess', function () {
    beforeEach(function () {
      this.sinon.stub(queueAgent.SQSActionDispatcher.prototype, 'poll').resolves()
    })
    it('creates and starts an SQSActionDispatcher', async function () {
      await eventProcessor.startProcessor()
      expect(queueAgent.SQSActionDispatcher.prototype.poll.callCount).to.equal(1)
    })
    it('logs an error if the dispatcher fails to poll', async function () {
      const p = new Promise((resolve) => {
        this.sinon.stub(mylog, 'error').callsFake(resolve)
      })

      queueAgent.SQSActionDispatcher.prototype.poll.rejects(new Error('polling error'))
      await eventProcessor.startProcessor()
      await p

      expect(mylog.error.callCount).to.equal(1)
    })
  })
})
