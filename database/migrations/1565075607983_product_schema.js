'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductSchema extends Schema {
  up () {
    this.create('products', (table) => {
      table.increments()
      table.integer('account_id').references('id').inTable('accounts')
      table.integer('event_id').references('id').inTable('events')
      table.text('name').notNullable()
      table.text('image').nullable()
      table.integer('price').unsigned().notNullable()
      table.timestamps()
      table.datetime('deleted_at').nullable()
    })
  }

  down () {
    this.drop('products')
  }
}

module.exports = ProductSchema
