'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AccountMasterSchema extends Schema {
  up () {
    this.create('account_masters', (table) => {
      table.increments()
      table.string('username', 255).unique().notNullable()
      table.string('password', 255).notNullable()
      table.timestamps()
      table.datetime('deleted_at').nullable()
    })
  }

  down () {
    this.drop('account_masters')
  }
}

module.exports = AccountMasterSchema
