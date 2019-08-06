'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AccountDetailSchema extends Schema {
  up () {
    this.create('account_details', (table) => {
      table.increments()
      table.integer('address_id').references('id').inTable('addresses')
      table.integer('permission_id').references('id').inTable('permissions')
      table.string('email', 255).unique()
      table.text('fullname').notNullable()
      table.text('profileUrl')
      table.string('phone', 20).unique()
      table.enu('status', ['verified', 'not verified']).notNullable()
      table.timestamps()
      table.datetime('deleted_at').nullable()
    })
  }

  down () {
    this.drop('account_details')
  }
}

module.exports = AccountDetailSchema
