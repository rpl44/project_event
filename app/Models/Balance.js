'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Balance extends Model {
    static get hidden(){
        return ['id']
    }
}

module.exports = Balance
