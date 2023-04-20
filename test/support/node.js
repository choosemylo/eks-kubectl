/* global beforeEach, afterEach */
if (process.env.NODE_ENV !== 'test') throw new Error('Tests should be run in NODE_ENV=test')

const sinon = require('sinon')
const chai = require('chai')
const dirtyChai = require('dirty-chai')
const chaiHttp = require('chai-http')
const chaiAsPromised = require('chai-as-promised')

chai.use(dirtyChai)
chai.use(chaiAsPromised)
chai.use(chaiHttp)
chai.use(require('sinon-chai'))

global.chai = chai
global.chaiAsPromised = chaiAsPromised
require('chai/register-expect')
global.AssertionError = chai.AssertionError
global.Assertion = chai.Assertion
global.assert = chai.assert

beforeEach(function () {
  this.sinon = sinon.createSandbox()
})

afterEach(function () {
  if (this.sinon && this.sinon.restore) this.sinon.restore()
})

module.exports = {}
