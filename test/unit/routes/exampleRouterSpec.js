/* global describe, it, beforeEach, expect */
const { stubResponse, createDeferredNext } = require('../../support/testUtils')
const exampleRouter = require('../../../app/routes/exampleRouter')
const exampleService = require('../../../app/services/exampleService')
const { CustomError } = require('../../../app/common/errors')

describe('exampleRouter', function () {
  let req, res

  beforeEach(function () {
    res = stubResponse()
  })

  describe('heartbeat', function () {
    it('responds', function () {
      req = {
        method: 'GET',
        url: '/heartbeat'
      }

      exampleRouter(req, res, console.log)
      return res.then(function () {
        expect(res.statusCode).to.eql(200)
        expect(res.text).to.not.be.empty()
      })
    })
  })

  describe('version', function () {
    it('responds with correct data', function () {
      req = {
        method: 'GET',
        url: '/version'
      }

      const versionInfo = {
        name: 'abc-123',
        version: '0.75.999'
      }

      this.sinon.stub(exampleService, 'getVersionInfo').returns(versionInfo)

      exampleRouter(req, res, console.log)
      return res.then(function () {
        expect(res.statusCode).to.eql(200)
        expect(res.text).to.eql(JSON.stringify(versionInfo, null, 2))
      })
    })
  })

  describe('env', function () {
    it('responds with data', function () {
      req = {
        method: 'GET',
        url: '/env'
      }

      exampleRouter(req, res, console.log)
      return res.then(function () {
        expect(res.statusCode).to.eql(200)
        expect(res.text).to.not.be.empty()
      })
    })
  })

  describe('/:key', function () {
    let serviceStub, next
    beforeEach(function () {
      serviceStub = this.sinon.stub(exampleService, 'doStuff').returns('service response')
      next = createDeferredNext()
      req = {
        method: 'POST',
        url: '/stuffKey',
        origin: 'req-origin',
        originalUrl: 'req-original-url',
        body: 'body-text'
      }
    })
    it('calls the service and returns response', function () {
      exampleRouter(req, res, console.log)
      return res.then(function () {
        expect(res.statusCode).to.eql(200)
        expect(res.text).to.eql('service response')
      })
    })
    it('adds metadata to new errors', function () {
      serviceStub.throws(new Error('generic error'))
      exampleRouter(req, res, next)
      return next.then(err => {
        expect(err.metaData).to.eql({
          origin: 'req-origin',
          originalUrl: 'req-original-url'
        })
      })
    })
    it('adds metadata to custom errors', function () {
      serviceStub.throws(new CustomError('custom error', { stuff: 'metadata' }))
      exampleRouter(req, res, next)
      return next.then(err => {
        expect(err.metaData).to.eql({
          origin: 'req-origin',
          originalUrl: 'req-original-url',
          stuff: 'metadata'
        })
      })
    })
  })
})
