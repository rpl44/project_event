'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostActionSchema extends Schema {
  up () {
    this.create('post_actions', (table) => {
      table.increments()
      table.integer('account_id').references('id').inTable('account_masters')
      table.enu('action', ['like', 'dislike', 'report']).notNullable()
      table.timestamps()
      table.datetime('deleted_at').nullable()
    })
  }

  down () {
    this.drop('post_actions')
  }
}

module.exports = PostActionSchema
