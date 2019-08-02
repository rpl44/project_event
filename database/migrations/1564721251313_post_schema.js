'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostSchema extends Schema {
  up () {
    this.create('posts', (table) => {
      table.increments()
      table.integer('account_id').references('id').inTable('account_masters')
      table.string('title', 255).notNullable()
      table.text('description').notNullable()
      table.timestamps()
      table.datetime('deleted_at').notNullable()
    })
  }

  down () {
    this.drop('posts')
  }
}

module.exports = PostSchema
