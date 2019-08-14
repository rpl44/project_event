'use strict'

const Hash = use('Hash')
const Helper = use('Helpers')
const Mail = use('Mail')
const Account = use('App/Models/Account')
const AuthToken = use('App/Models/AuthToken')
const Address = use('App/Models/Address')
const Post = use('App/Models/Post')
const Event = use('App/Models/Event')

const responseJSON = {
    meta: {
        code: 200,
        status: "success",
        message: null
    },
    data: null
}

class ApiController {

    // Initialize token
    async initialize({request, response}){
        request.data = request.all()
        
        const searchAccount = await AuthToken.query()
        .where("id", request.data.user_id)
        .where("client_token", request.data.client_token)
        .first()

        if(!searchAccount){
            responseJSON.meta.code = 401
            responseJSON.meta.status = "failed"
            responseJSON.meta.message = "Invalid client id/client_token"
            responseJSON.data = []
        }
        return response.status(responseJSON.meta.code).json(responseJSON)
    }

    // Register
    async register({request, response}){
        request.data = request.all()
        
        request.data.account = await Account.create(request.data)
        responseJSON.meta.code = 201
        responseJSON.meta.status = "success"
        responseJSON.meta.message = "An email verification has been sent to "+request.data.email+", please check the email box"
        responseJSON.data = []

        await Mail.send('email.verify', request.data.account.toJSON(), message => {
            message.to(request.data.email).from('noreply@event.com').subject('Project Event')
        })
        return response.status(responseJSON.meta.code).json(responseJSON)
    }

    // Login
    async login({request, response}){
        request.data = request.all()

        const account = await Account.query()
        .where("email", request.data.email)
        .where("deleted_at", null)
        .first()

        if(account){
            const passwordVerified = await Hash.verify(request.data.password, account.password)
            if(passwordVerified){
                responseJSON.meta.code = 200
                responseJSON.meta.status = "success"
                responseJSON.meta.message = null
                responseJSON.data = {
                    token: request.access_token
                }
            }
            else{
                responseJSON.meta.code = 404
                responseJSON.meta.status = "failed"
                responseJSON.meta.message = "Email or password wrong"
                responseJSON.data = []
            }
        }
        else{
            responseJSON.meta.code = 404
            responseJSON.meta.status = "failed"
            responseJSON.meta.message = "User not found"
            responseJSON.data = []
        }
        
        return response.status(responseJSON.meta.code).json(responseJSON)
    }
    // Get account data
    async account_data({response, params}){
        let account = await Account.all()
        if(params.id){
            account = await Account.find(params.id)
        }
        responseJSON.meta.code = 200
        responseJSON.meta.status = "success"
        responseJSON.data = account
        
        if(account.size > 0){
            responseJSON.meta.message = "Showing list of "+ (params.id)? "account with id "+ params.id : "all account"+ (account.size>1)? "s" : ""
        }
        else{
            responseJSON.meta.message = "Account data not found"
        }

        return response.status(responseJSON.meta.code).json(responseJSON)
    }
    // Get post data
    async post_data({response, params}){
        let post = await Post.all()
        if(params.id){
            post = await Post.find(params.id)
        }
        responseJSON.meta.code = 200
        responseJSON.meta.status = "success"
        responseJSON.data = post
        
        if(post.size > 0){
            responseJSON.meta.message = "Showing list of "+ (params.id)? "post with id "+ params.id : "all post"+ (post.size>1)? "s" : ""
        }
        else{
            responseJSON.meta.message = "Post data not found"
        }

        return response.status(responseJSON.meta.code).json(responseJSON)
    }

    async event_data({response,params}){
        var event_data = await Event.all()
        if(params.id){
            event_data = await Event.find(params.id)
        }
        return response.status(200).json(event_data)
    }

    async address_data({response,params}){
        var address_data = await Address.all()
        if(params.id){
            address_data = await Address.find(params.id)
        }
        
        return response.status(200).json(address_data)
    }
}

module.exports = ApiController
