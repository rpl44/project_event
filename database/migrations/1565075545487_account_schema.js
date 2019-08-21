'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AccountSchema extends Schema {
  up () {
    this.create('accounts', (table) => {
      table.increments()
      table.integer('address_id').references('id').inTable('addresses')
      table.integer('permission_id').references('id').inTable('permissions').notNullable().defaultTo(5)
      table.string('username', 60).notNullable().unique()
      table.string('password', 60).notNullable()
      table.string('email', 255).nullable().unique()
      table.string('name', 255).notNullable()
      table.string('phone', 20).nullable().unique()
      table.text('avatarUrl').nullable()
      table.string('verification_code', 20).nullable()
      table.boolean('status').defaultTo(false)
      table.timestamps()
      table.datetime('deleted_at').nullable()
    })
  }

  down () {
    this.drop('accounts')
  }
}

module.exports = AccountSchema
