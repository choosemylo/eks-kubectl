/* global describe, it, beforeEach, expect */
const { stubResponse, createDeferredNext } = require('../../support/testUtils')
const echoRouter = require('../../../app/routes/echoRouter')
const { BadRequestError } = require('../../../app/common/errors')

describe('echoRouter', function () {
  describe('POST', function () {
    let req, res

    beforeEach(function () {
      req = {
        method: 'POST',
        url: '/',
        is: function () {
          return true // default to assume we have the right content-type
        },
        get: function () {
          return 'dummy-data'
        }
      }
      res = stubResponse()
    })

    it('sends back text data', function () {
      const data = { data: 'this is json' }
      req.body = data

      echoRouter(req, res, console.log)
      return res.then(function () {
        expect(res.statusCode).to.eql(200)
        expect(res.text).to.eql(JSON.stringify(data))
      })
    })

    it('BadRequestError with the wrong content-type', function () {
      const next = createDeferredNext()
      req.is = function (type) {
        return false
      }

      echoRouter(req, res, next)
      return next.then(err => {
        expect(err).to.be.instanceof(BadRequestError)
        expect(err.message).to.eql('Request must be of ContentType "application/json"')
        expect(err.metaData).to.eql({ contentType: 'dummy-data', operation: 'echoRouter:post' })
      })
    })
  })
})
