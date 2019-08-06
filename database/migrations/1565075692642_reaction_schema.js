'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ReactionSchema extends Schema {
  up () {
    this.create('reactions', (table) => {
      table.increments()
      table.integer('account_id').references('id').inTable('accounts')
      table.integer('post_id').references('id').inTable('posts')
      table.enu('type', ['like', 'report']).defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('reactions')
  }
}

module.exports = ReactionSchema
