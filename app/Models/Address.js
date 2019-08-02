'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Address extends Model {
    account_details(){
        return this.hasOne('App/Models/AccountDetail')
    }
    event_details(){
        return this.hasMany('App/Models/EventDetail')
    }
}

module.exports = Address
