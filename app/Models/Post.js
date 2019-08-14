'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Post extends Model {
    static get hidden(){
        return ['updated_at', 'deleted_at']
    }
    post_actions(){
        return this.hasMany('App/Models/')
    }
}

module.exports = Post
