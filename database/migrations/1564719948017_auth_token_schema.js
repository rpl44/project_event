'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AuthTokenSchema extends Schema {
  up () {
    this.create('auth_tokens', (table) => {
      table.integer('account_id').references('id').inTable('account_masters')
      table.text('access_token').notNullable()
      table.text('refresh_token').notNullable()
      table.datetime('expired_at').notNullable()
      table.timestamps()
      table.datetime('deleted_at').nullable()
    })
  }

  down () {
    this.drop('auth_tokens')
  }
}

module.exports = AuthTokenSchema
