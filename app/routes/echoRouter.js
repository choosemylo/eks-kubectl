const express = require('express')
const router = express.Router()
const { BadRequestError } = require('../common/errors')

router.post('/', function (req, res, next) {
  if (req.is('application/json')) {
    res.json(req.body)
  } else {
    next(new BadRequestError('Request must be of ContentType "application/json"', { contentType: req.get('content-type'), operation: 'echoRouter:post' }))
  }
})

module.exports = router
