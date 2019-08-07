'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Account extends Model {
    payments(){
        return this.hasMany('App/Models/Payment')
    }
    products(){
        return this.hasMany('App/Models/Product')
    }
    events(){
        return this.hasMany('App/Models/Event')
    }
    posts(){
        return this.hasMany('App/Models/Post')
    }
    reactions(){
        return this.hasMany('App/Models/Reaction')
    }
    balance(){
        return this.hasOne('App/Models/Balance')
    }
    auth_token(){
        return this.hasOne('App/Models/AuthToken')
    }
}

module.exports = Account
