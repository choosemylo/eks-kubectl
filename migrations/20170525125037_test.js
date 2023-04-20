'use strict'

const tableName = 'test'

exports.up = knex => {
  return knex.schema
    .createTable(tableName, function (table) {
      table.uuid('id').notNullable().primary()
      table.string('name', 255).notNullable().unique()
      table.integer('status').notNullable().unsigned()

      table.index(['id'])
      table.index(['name', 'status'])

      table.timestamps()
    })
}

exports.down = knex => {
  return knex.schema.dropTable(tableName)
}
