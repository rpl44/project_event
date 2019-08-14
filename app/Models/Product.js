'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Product extends Model {
    static get hidden(){
        return ['updated_at', 'deleted_at']
    }
    payments(){
        return this.hasMany('App/Models/Payment')
    }
}

module.exports = Product
