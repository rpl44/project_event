'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EventDetailSchema extends Schema {
  up () {
    this.create('event_details', (table) => {
      table.integer('event_id').references('id').inTable('event_masters')
      table.integer('partner_id').references('id').inTable('account_masters')
      table.integer('address_id').references('id').inTable('addresses')
      table.enu('status', ['canceled', 'finished', 'unfinished']).notNullable()
      table.integer('cost', 16).unsigned().notNullable()
      table.datetime('start_time').notNullable()
      table.datetime('end_time').notNullable()
      table.timestamps()
      table.datetime('deleted_at').nullable()
    })
  }

  down () {
    this.drop('event_details')
  }
}

module.exports = EventDetailSchema
