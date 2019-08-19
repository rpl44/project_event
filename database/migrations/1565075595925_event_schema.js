'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EventSchema extends Schema {
  up () {
    this.create('events', (table) => {
      table.increments()
      table.integer('account_id').references('id').inTable('accounts')
      table.string('title', 255).notNullable()
      table.text('description').nullable()
      table.integer('price').notNullable().unsigned()
      table.datetime('time').notNullable()
      table.timestamps()
      table.datetime('deleted_at').nullable()
    })
  }

  down () {
    this.drop('events')
  }
}

module.exports = EventSchema
