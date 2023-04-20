const { Client } = require('pg')
const env = process.env.NODE_ENV || 'development'
const connections = require('../app/common/database').connections
const environment = connections[env]

let command
if (process.argv[2] === 'create') {
  command = 'create'
} else if (process.argv[2] === 'drop') {
  command = 'drop'
} else {
  console.log('Usage: node db.js create|drop')
  process.exit(1)
}

(async function () {
  const database = environment.connection.database
  const c = Object.assign({}, environment.connection, { database: 'postgres' })
  const client = new Client(c)

  try {
    await client.connect()

    if (command === 'create') {
      await client.query(`CREATE DATABASE ${database}`)
    } else if (command === 'drop') {
      await client.query(`SELECT pg_terminate_backend(pg_stat_activity.pid) 
        FROM pg_stat_activity 
        WHERE pg_stat_activity.datname = '${database}' AND pid <> pg_backend_pid();`) // disconnect all sessions
      await client.query('SELECT * FROM pg_stat_activity')
      await client.query(`DROP DATABASE ${database}`)
    }
    console.log(`Database ${database} created successfully!`)
  } catch (e) {
    console.log('Error:')
    console.log(e)
  }
  return client.end()
})()
