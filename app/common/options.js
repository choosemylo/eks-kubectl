const databaseRootName = require('../../package.json').name.replace(/-/g, '_')
const fs = require('fs')

// TODO: the public key is only needed if your service has protected routes with a scope
const verifyKeyPath = process.env.AUTH_VERIFY_KEY_PATH
if (!verifyKeyPath && process.env.NODE_ENV !== 'test') {
  throw Error('AUTH_VERIFY_KEY_PATH environment variable is required')
}
// TODO: the private key is only needed if your service needs authenticated scopes to access another service
const privateKeyPath = process.env.AUTH_PRIVATE_KEY_PATH
if (!privateKeyPath && process.env.NODE_ENV !== 'test') {
  throw Error('AUTH_PRIVATE_KEY_PATH environment variable is required')
}

module.exports = {
  database: {
    client: process.env.DATABASE_CLIENT || 'pg',
    host: process.env.DATABASE_HOST || '127.0.0.1',
    port: process.env.DATABASE_PORT || 5432,
    user: process.env.DATABASE_USER,
    database: process.env.DATABASE || databaseRootName,
    password: process.env.DATABASE_PASSWORD
  },
  auth: {
    verifyKey: process.env.NODE_ENV !== 'test' ? fs.readFileSync(verifyKeyPath) : 'fake-public-key',
    privateKey: process.env.NODE_ENV !== 'test' ? fs.readFileSync(privateKeyPath) : 'fake-private-key',
    clientId: process.env.AUTH_CLIENT_ID || 'auth-client-id',
    host: resolveService('AUTH').host || 'localhost',
    port: resolveService('AUTH').port || '3000',
    protocol: resolveService('AUTH').protocol || 'http://'
  },
  sqs: {
    queueUrl: process.env.AWS_SQS_QUEUE_URL,
    endpoint: process.env.AWS_SQS_ENDPOINT,
    region: process.env.AWS_SQS_REGION,
    accessKeyId: process.env.AWS_SQS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SQS_SECRET_ACCESS_KEY
  }
}

function resolveService (serviceNameEnv) {
  const prefix = process.env[serviceNameEnv + '_SERVICE_NAME'] || 'SERVICE_NAME_NOT_FOUND'
  const host = process.env[prefix + '_SERVICE_HOST']
  const port = process.env[prefix + '_SERVICE_PORT']
  const protocol = process.env[prefix + '_SERVICE_PROTO']
  return { host, port, protocol }
}
