'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PaymentSchema extends Schema {
  up () {
    this.create('payments', (table) => {
      table.increments()
      table.integer('account_id').references('id').inTable('account_masters')
      table.integer('amount', 16).unsigned().notNullable()
      table.string('currency', 15).notNullable()
      table.timestamps()
      table.datetime('deleted_at').nullable()
    })
  }

  down () {
    this.drop('payments')
  }
}

module.exports = PaymentSchema
