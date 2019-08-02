'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EventMasterSchema extends Schema {
  up () {
    this.create('event_masters', (table) => {
      table.increments()
      table.string('event_name', 255).notNullable()
      table.text('description').notNullable()
      table.timestamps()
      table.datetime('deleted_at').nullable()
    })
  }

  down () {
    this.drop('event_masters')
  }
}

module.exports = EventMasterSchema
