'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TicketSchema extends Schema {
  up () {
    this.create('tickets', (table) => {
      table.increments()
      table.integer('event_id').references('id').inTable('event_masters')
      table.integer('account_id').references('id').inTable('account_masters')
      table.integer('payment_id').references('id').inTable('payments')
      table.enu('status', ['used', 'not used']).notNullable()
      table.datetime('expired_at').notNullable()
      table.timestamps()
      table.datetime('deleted_at').nullable()
    })
  }

  down () {
    this.drop('tickets')
  }
}

module.exports = TicketSchema
