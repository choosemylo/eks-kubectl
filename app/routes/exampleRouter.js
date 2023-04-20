const express = require('express')
const router = express.Router()
const mylog = require('@mylo/mylog')
const exampleService = require('../services/exampleService')

router.get('/heartbeat', (req, res) => {
  const isoString = new Date().toISOString()
  mylog.info('heartbeat')
  res.send(isoString)
})

router.get('/version', (req, res) => {
  const versionInfo = exampleService.getVersionInfo()
  res.send(JSON.stringify(versionInfo, null, 2))
})

router.get('/env', (req, res) => {
  res.send(JSON.stringify(process.env, null, 2))
})

router.post('/:key', function (req, res, next) {
  const { key } = req.params
  const { body, origin, originalUrl } = req
  try {
    res.send(exampleService.doStuff(key, body))
  } catch (err) {
    err.metaData = {
      origin,
      originalUrl,
      ...err.metaData
    }
    next(err)
  }
})

module.exports = router
