'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddressSchema extends Schema {
  up () {
    this.create('addresses', (table) => {
      table.increments()
      table.text('street_name').nullable()
      table.string('city', 255).nullable()
      table.string('country', 255).nullable()
      table.string('post_code').nullable()
      table.timestamps()
      table.datetime('deleted_at').nullable()
    })
  }

  down () {
    this.drop('addresses')
  }
}

module.exports = AddressSchema
