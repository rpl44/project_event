'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Permission extends Model {
    account(){
        return this.hasOne('App/Models/Account')
    }
}

module.exports = Permission
