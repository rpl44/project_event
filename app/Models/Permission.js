'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Permission extends Model {
    accounts(){
        return this.hasMany('App/Models/Account')
    }
}

module.exports = Permission
