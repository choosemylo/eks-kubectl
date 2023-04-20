const express = require('express')
const mylog = require('@mylo/mylog')
const diagnostics = require('@mylo/diagnostic-middleware')
const authTokenUtil = require('@mylo/auth-token-util')
const { ServiceContext, initializeApp } = require('@mylo/service-common')
const router = require('./routes')
const { knex } = require('./common/database')
const { name, version } = require('../package.json')

// TODO: update appname & servicename
mylog.options({
  appname: 'express-project-skeleton',
  servicename: 'express-project-skeleton'
})

// NOTE - This only needed for services with a databases
function healthCheck () {
  return knex.raw('SELECT table_name FROM information_schema.tables')
    .then(() => {
      mylog.trace('healthCheck ok', { operation: 'healthCheck' })
      return true
    }).catch(err => {
      mylog.error('healthCheck error', err, { operation: 'healthCheck' })
      return false
    })
}

const options = {
  healthCheck,
  name,
  router,
  useAuth: true,
  version
  // TODO: verify any needed scopes (example below)
  // startupScopes: ['naics:search']
}

const ctx = ServiceContext.create()
  .withContext({
    auth: authTokenUtil,
    diagnostics,
    express,
    log: mylog
  })
  .withOptions(options)
  .build()
const app = initializeApp(ctx)

module.exports = app
