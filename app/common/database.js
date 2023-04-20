const mydb = require('@mylo/my-objection-db')
module.exports = mydb(require('./options').database)
