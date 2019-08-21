'use strict'

const Hash = use('Hash')
const Helper = use('Helpers')
const Mail = use('Mail')
const Account = use('App/Models/Account')
const AuthToken = use('App/Models/AuthToken')
const Address = use('App/Models/Address')
const Post = use('App/Models/Post')
const Event = use('App/Models/Event')
const Env = use('Env')

// Response Builder
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

    // Account - Registration
    async register({request, response}){
        request.data = request.all()
        if(request.data){
            const address = await Address.create()

            const account_data = await Account.create({
                address_id: address.id,
                username: request.data.username,
                password: request.data.password,
                email: request.data.email,
                name: request.data.name,
            })

            responseJSON.meta.code = 201
            responseJSON.meta.status = "success"
            responseJSON.meta.message = "An email verification has been sent to "+request.data.email+", please check the email box"

            const date = new Date()
            responseJSON.data = {
                account: account_data,
                confirm_url: `${Env.get('APP_URL')}/api/v1/register/confirm/${account_data.password}`,
                expired_at: `${date.getDate()+1}:${date.getMonth()+1}:${date.getFullYear()}` 
            }

            await Mail.send('email.verify',account_data.toJSON(), message => {
                message.to(request.data.email).from('noreply@event.com').subject('Project Event')
            })
        }
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
    // Confirm token
    async confirm_token({response, params}){
        if(!params.confirm_token){
            responseJSON.meta.code = 404
            responseJSON.meta.status = "failed"
            responseJSON.meta.message = "Confirmation token was not found"
            responseJSON.data = []
        }

        const account = await Account.findBy('password', params.confirm_token)
        const expired_at = account.created_at
        const date = new Date()
        if(`${date.getDate()}:${date.getMonth()+1}:${date.getFullYear()}` <= `${date.getDate(expired_at)+1}:${date.getMonth(expired_at)+1}:${date.getFullYear(expired_at)}`){
            account.status = true
            await account.save()

            responseJSON.meta.code = 200
            responseJSON.meta.status = "success"
            responseJSON.meta.message = "Email successfully registered"
            responseJSON.data = account
        }
        else{
            responseJSON.meta.code = 404
            responseJSON.meta.status = "failed"
            responseJSON.meta.message = "Registration should not more than 1 day"
            responseJSON.data = []
        }
        return response.status(responseJSON.meta.code).json(responseJSON)
    }

    // Get account data
    async account_data({response, params}){
        let account = await Account.all()
        let account_id = params.id
        if(account_id){
            account = await Account.find(params.id)
        }
        responseJSON.meta.code = 200
        responseJSON.meta.status = "success"
        responseJSON.data = account
    
        if(!account){
            responseJSOn.meta.message = "Account data not found"
        }
        else{
            var plusmessage
            if(params.id = "undefined"){
                plusmessage = "all accounts" 
            }
            else{
                plusmessage = "account with id "+ params.id
            }
            responseJSON.meta.message = "Showing list of " + plusmessage
        }

        return response.status(responseJSON.meta.code).json(responseJSON)
    }

    // Update account data
    async account_update({request, response, params}){
        request.data = request.all()
        if(!request.data){
            responseJSON.meta.code = 404
            responseJSON.meta.status = "failed"
            responseJSON.meta.message = "Invalid form"
            responseJSON.data = []
        }
        const account = await Account.find(params.id)
        if(account){
            account.name = request.data.name
            account.username = request.data.username
            account.password = request.data.password
            account.email = request.data.email
            account.phone = request.data.phone
            
            if(request.data.avatarUrl){
                account.avatarUrl = request.data.avatarUrl
            }
            await account.save()
            responseJSON.meta.code = 200
            responseJSON.meta.status = "success"
            responseJSON.meta.message = "Account data has been updated"
            responseJSON.data = account
        }
        else{
            responseJSON.meta.code = 404
            responseJSON.meta.status = "failed"
            responseJSON.meta.message = "Account data not found"
            responseJSON.data = []
        }

        return response.status(responseJSON.meta.code).json(responseJSON)
    }
    
    async account_delete({params, response}){
        if(params.id){
            const account = await Account.find(params.id)
            if(!account){
                responseJSON.meta.code = 404
                responseJSON.meta.status = "failed"
                responseJSON.meta.message = "Account not found"
                responseJSON.data = []
            }
            else{
                let date = new Date()
                
                let address_id = account.address_id     
                account.address_id = null
                account.status = false
                account.deleted_at = date
                await account.save()

                const address = await Address.find(address_id)
                await address.delete()

                responseJSON.meta.code = 200
                responseJSON.meta.status = "success"
                responseJSON.meta.message = "Account has been deleted"
                responseJSON.data = account
            }
        }
        else{
            responseJSON.meta.code = 404
            responseJSON.meta.status = "failed"
            responseJSON.meta.message = "Invalid Account ID"
            responseJSON.data = []
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
