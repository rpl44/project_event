'use strict'

/*
|--------------------------------------------------------------------------
| PermissionSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Permission = use('App/Models/Permission')
class PermissionSeeder {
  async run () {
    const p = new Permission()
    p.permission_name = "Super Administrator"
    p.manage_balances = true
    p.manage_events = true
    p.manage_members = true
    p.manage_payments = true
    p.manage_posts = true
    p.manage_products = true
    p.manage_roles = true
    p.manage_tickets = true
    p.create_events = true
    p.create_posts = true
    p.create_products = true
    p.create_tickets = true
    p.give_balances = true
    p.view_payment_history = true

    await p.save()

    const p2 = new Permission()
    p2.permission_name = "Administrator"
    p2.manage_balances = true
    p2.manage_events = true
    p2.manage_members = false
    p2.manage_payments = true
    p2.manage_posts = true
    p2.manage_products = true
    p2.manage_roles = false
    p2.manage_tickets = true
    p2.create_events = true
    p2.create_posts = true
    p2.create_products = true
    p2.create_tickets = true
    p2.give_balances = true
    p2.view_payment_history = false

    await p2.save()
    
    const p3 = new Permission()
    p3.permission_name = "Partner"
    p3.manage_balances = false
    p3.manage_events = false
    p3.manage_members = false
    p3.manage_payments = false
    p3.manage_posts = false
    p3.manage_products = false
    p3.manage_roles = false
    p3.manage_tickets = false
    p3.create_events = true
    p3.create_posts = true
    p3.create_products = false
    p3.create_tickets = true
    p3.give_balances = false
    p3.view_payment_history = false

    await p3.save()

    const p4 = new Permission()
    p4.permission_name = "Merchant"
    p4.manage_balances = false
    p4.manage_events = false
    p4.manage_members = false
    p4.manage_payments = false
    p4.manage_posts = false
    p4.manage_products = false
    p4.manage_roles = false
    p4.manage_tickets = false
    p4.create_events = false
    p4.create_posts = true
    p4.create_products = true
    p4.create_tickets = false
    p4.give_balances = false
    p4.view_payment_history = false

    await p4.save()
    
    const p5 = new Permission()
    p5.permission_name = "Member"
    p5.manage_balances = false
    p5.manage_events = false
    p5.manage_members = false
    p5.manage_payments = false
    p5.manage_posts = false
    p5.manage_products = false
    p5.manage_roles = false
    p5.manage_tickets = false
    p5.create_events = false
    p5.create_posts = true
    p5.create_products = false
    p5.create_tickets = false
    p5.give_balances = false
    p5.view_payment_history = false

    await p5.save()
  }
}

module.exports = PermissionSeeder
