const { CustomError } = require('../common/errors')

function getVersionInfo () {
  return {
    name: process.env.npm_package_name || require('../../package.json').name,
    version: process.env.npm_package_version || require('../../package.json').version
  }
}

function doStuff (key, stuff) {
  if (key === 'error') {
    const error = new Error('this is a basic error')
    error.metaData = { stuff, operation: 'exampleService:doStuff' }
    throw error
  } else if (key === 'custom-error') {
    throw new CustomError('this is a custom error', { stuff, operation: 'exampleService:doStuff' })
  }
  return `Processed ${stuff} (key: ${key})`
}

module.exports = {
  getVersionInfo,
  doStuff
}
