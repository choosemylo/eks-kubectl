const router = require('express').Router()

router.use('/example/', require('./exampleRouter'))
router.use('/echo', require('./echoRouter'))

module.exports = router
