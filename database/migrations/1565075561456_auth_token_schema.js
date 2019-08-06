'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AuthTokenSchema extends Schema {
  up () {
    this.create('auth_tokens', (table) => {
      table.increments()
      table.integer('account_id').references('id').inTable('accounts')
      table.text('access_token')
      table.text('refresh_token')
      table.datetime('expired_at').nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('auth_tokens')
  }
}

module.exports = AuthTokenSchema
