/* global describe, it, expect */
const { knex } = require('../../app/common/database')
const chai = require('chai')
chai.use(require('chai-http'))
const app = require('../../app/app')

/**
 * We test functionality of each route individually elsewhere.
 * Here we are only interested in if the route is responding on the application.
 */
describe('app', function () {
  describe('routes', function () {
    it('contains diagnostics', function () {
      return chai.request(app)
        .get('/example/env')
        .then(res => {
          expect(res.status).to.eql(200)
        })
    })
    it('contains heartbeat', function () {
      return chai.request(app)
        .get('/heartbeat')
        .then(res => {
          expect(res.status).to.eql(200)
        })
    })
    it('checks database on healthz', function () {
      this.sinon.stub(knex, 'raw').resolves()
      return chai.request(app)
        .get('/healthz')
        .then(res => {
          expect(knex.raw.callCount).to.eql(1)
          expect(res.status).to.eql(200)
          expect(res.text).to.eql('true')
        })
    })
    it('healthz handles database error', function () {
      this.sinon.stub(knex, 'raw').rejects(new Error('database problem'))
      return chai.request(app)
        .get('/healthz')
        .then(res => {
          expect(knex.raw.callCount).to.eql(1)
          expect(res.status).to.eql(503)
          expect(res.text).to.eql('false')
        })
    })
  })
})
