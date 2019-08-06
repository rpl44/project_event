'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class AccountMaster extends Model {
    static boot () {
        super.boot()
    
        /**
         * A hook to hash the user password before saving
         * it to the database.
         */
        this.addHook('beforeSave', async (userInstance) => {
          if (userInstance.dirty.password) {
            userInstance.password = await Hash.make(userInstance.password)
          }
        })
    }
    
    /**
     * A relationship on tokens is required for auth to
     * work. Since features like `refreshTokens` or
     * `rememberToken` will be saved inside the
     * tokens table.
     *
     * @method tokens
     *
     * @return {Object}
     */
    token () {
        return this.hasOne('App/Models/AuthToken')
    }
    account_detail() {
        return this.hasOne('App/Models/AccountDetail')
    }
    payment_balance(){
        return this.hasOne('App/Models/PaymentBalance')
    }
    posts(){
        return this.hasMany('App/Models/Post')
    }
    post_actions(){
        return this.hasMany('App/Models/PostAction')
    }
    event_details() {
        return this.hasMany('App/Models/EventDetail')
    }
    payments(){
        return this.hasMany('App/Models/Payment')
    }
    products(){
        return this.hasMany('App/Models/Product')
    }
}

module.exports = AccountMaster
