'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PermissionSchema extends Schema {
  up () {
    this.create('permissions', (table) => {
      table.increments()
      table.string('permission_name', 255).notNullable()
      table.boolean('manage_balances').defaultTo(false)
      table.boolean('manage_events').defaultTo(false)
      table.boolean('manage_members').defaultTo(false)
      table.boolean('manage_payments').defaultTo(false)
      table.boolean('manage_posts').defaultTo(false)
      table.boolean('manage_products').defaultTo(false)
      table.boolean('manage_roles').defaultTo(false)
      table.boolean('manage_tickets').defaultTo(false)
      table.boolean('create_events').defaultTo(false)
      table.boolean('create_posts').defaultTo(false)
      table.boolean('create_products').defaultTo(false)
      table.boolean('create_tickets').defaultTo(false)
      table.boolean('give_balances').defaultTo(false)
      table.boolean('view_payment_history').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('permissions')
  }
}

module.exports = PermissionSchema
