'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PaymentBalanceSchema extends Schema {
  up () {
    this.create('payment_balances', (table) => {
      table.integer('account_id').references('id').inTable('account_masters')
      table.integer('total_balance').notNullable()
      table.string('currency', 15).notNullable()
      table.timestamps()
      table.datetime('deleted_at').nullable()
    })
  }

  down () {
    this.drop('payment_balances')
  }
}

module.exports = PaymentBalanceSchema
