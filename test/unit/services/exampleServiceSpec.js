/* global describe, it, expect */
const exampleService = require('../../../app/services/exampleService')
const packageInfo = require('../../../package.json')
const { CustomError } = require('../../../app/common/errors')

describe('exampleService', function () {
  describe('getVersionInfo', function () {
    it('returns package name', function () {
      expect(exampleService.getVersionInfo().name).to.equal(packageInfo.name)
    })

    it('returns package version', function () {
      expect(exampleService.getVersionInfo().version).to.equal(packageInfo.version)
    })

    it('returns package name from env', function () {
      process.env.npm_package_name = 'test-package-name'

      expect(exampleService.getVersionInfo().name).to.equal('test-package-name')
    })

    it('returns package version from env', function () {
      process.env.npm_package_version = 'test-package-version'

      expect(exampleService.getVersionInfo().version).to.equal('test-package-version')
    })
  })

  describe('doStuff', function () {
    it('handles string that is not error', function () {
      expect(exampleService.doStuff('something', 'data')).to.eql('Processed data (key: something)')
    })
    it('handles error string', function () {
      try {
        exampleService.doStuff('error', 'data')
        expect('should not reach this line').to.eql(true)
      } catch (err) {
        expect(err).to.be.instanceof(Error)
        expect(err.message).to.eql('this is a basic error')
        expect(err.metaData).to.eql({ stuff: 'data', operation: 'exampleService:doStuff' })
      }
    })
    it('handles customError string', function () {
      try {
        exampleService.doStuff('custom-error', 'data')
        expect('should not reach this line').to.eql(true)
      } catch (err) {
        expect(err).to.be.instanceof(CustomError)
        expect(err.message).to.eql('this is a custom error')
        expect(err.metaData).to.eql({ stuff: 'data', operation: 'exampleService:doStuff' })
      }
    })
    it('handles an object', function () {
      const stuff = { a: 'A' }
      expect(exampleService.doStuff(stuff, 'data')).to.eql('Processed data (key: [object Object])')
    })
  })
})
