'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BalanceSchema extends Schema {
  up () {
    this.create('balances', (table) => {
      table.increments()
      table.integer('account_id').references('id').inTable('accounts')
      table.integer('current').unsigned().nullable()
      table.datetime('last_charged')
    })
  }

  down () {
    this.drop('balances')
  }
}

module.exports = BalanceSchema
