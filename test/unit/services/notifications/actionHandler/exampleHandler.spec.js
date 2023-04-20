/* global describe, beforeEach, it, expect */
const mylog = require('@mylo/mylog')
const exampleHandler = require('../../../../../app/services/notifications/actionHandler/exampleHandler')

describe('exampleHandler', function () {
  let mylogInfoStub
  beforeEach(function () {
    mylogInfoStub = this.sinon.stub(mylog, 'info')
  })
  it('runs action in the example handler', async function () {
    const messageBody = {
      action: 'An Action',
      objectId: 'The Object Id',
      object: 'An Object'
    }
    await exampleHandler(messageBody)
    expect(mylogInfoStub.calledOnce).to.be.true()
  })
})
