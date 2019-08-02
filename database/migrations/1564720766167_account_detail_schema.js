'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AccountDetailSchema extends Schema {
  up () {
    this.create('account_details', (table) => {
      table.integer('account_id').references('id').inTable('account_masters')
      table.integer('address_id')
      table.string('email', 255).unique()
      table.string('fullname', 255).notNullable()
      table.string('phone', 20).unique()
      table.text('profile_url')
      table.enu('roles', ['admin', 'member', 'partner']).notNullable()
      table.boolean('is_active').defaultTo(false)
      table.timestamps()
      table.datetime('deleted_at').nullable()
    })
  }

  down () {
    this.drop('account_details')
  }
}

module.exports = AccountDetailSchema
