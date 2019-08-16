'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Hash = use('Hash')

class Account extends Model {
    static get hidden(){
        return ['password', 'deleted_at', 'created_at', 'updated_at']
    }
    static boot () {
        super.boot()
    
        /**
         * A hook to hash the user password before saving
         * it to the database.
         */
        this.addHook('beforeSave', async (userInstance) => {
          if (userInstance.dirty.password) {
            const hash = await Hash.make(userInstance.password)
            const hashed = hash.replace(/\//g, '');
            userInstance.password = hashed
          }
        })
    }
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
