'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductSchema extends Schema {
  up () {
    this.create('products', (table) => {
      table.increments()
      table.string('product_code', 6).unique().notNullable()
      table.integer('account_id').references('id').inTable('account_masters')
      table.text('product_name').notNullable()
      table.integer('product_price').unsigned().notNullable()
      table.integer('total').unsigned().nullable()
      table.string('category', 255).notNullable()
      table.timestamps()
      table.datetime('deleted_at').nullable()
    })
  }

  down () {
    this.drop('products')
  }
}

module.exports = ProductSchema
