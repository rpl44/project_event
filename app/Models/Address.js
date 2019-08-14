'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Address extends Model {
    static get hidden(){
        return ['created_at', 'updated_at', 'deleted_at']
    }
    account(){
        return this.hasOne('App/Models/Account')
    }
    event(){
        return this.hasOne('App/Models/Event')
    }
}

module.exports = Address
