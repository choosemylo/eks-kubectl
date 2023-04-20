const Model = require('../common/database').Model

class Test extends Model {
  static get tableName () {
    return 'test'
  }

  // static get jsonSchema () {
  //   return {
  //     type: 'object',
  //     required: ['name', 'color'],
  //     properties: {
  //       id: {type: 'string'},
  //       name: {type: 'string'},
  //       color: {type: 'string'},
  //       size: {type: 'number'},
  //       createdAt: {type: 'string', format: 'date-time'},
  //       updatedAt: {type: 'string', format: 'date-time'}
  //     }
  //   }
  // }

  // static get relationMappings () {
  //   return {
  //     foos: {
  //       relation: Model.HasManyRelation,
  //       modelClass: require('./foo'),
  //       join: {
  //         from: 'foo.id',
  //         to: 'test.fooId'
  //       }
  //     },
  //     bar: {
  //       relation: Model.BelongsToOneRelation,
  //       modelClass: require('./bar'),
  //       join: {
  //         from: 'test.barId',
  //         to: 'bar.id'
  //       }
  //     }
  //   }
  // }
}

module.exports = Test
