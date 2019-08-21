'use strict'

const Mail = use('Mail')
const Account = use('App/Models/Account')
const AuthToken = use('App/Models/AuthToken')
const Address = use('App/Models/Address')

const responseJSON = {
    meta: {
        code: 200,
        status: "success",
        message: "ok"
    },
    data: null
}

class RegisterController {
    
    async index({view}){
        return view('register')
    }
    
    async check({request}){
        console.log('sampe controller');
        if (request.get('email')) {
            var email = request.get('email')
            const data = await Account()
            .query()
            .where('email',email)
            .count()

            if (data > 0) {
                return "not unique";
            }
            else {
                return "unique";
            }
        } 
    }
    
    
    async api_register({request, response}) {
        request.data = request.all()
        if(request.data) {
            const address_data = await Address.create()
            const account_data = await Account.create({
                address_id: address_data.id,
                username: request.data.username,
                password: request.data.password,
                email: request.data.email,
                name: request.data.name
            })

            const date = new Date()
            const expired_date = `${date.getDate()+1}-${date.getMonth()+1}-${date.getFullYear()}`

            await Mail.send('email.verify', account_data.toJSON(), message => {
                message.to(request.data.email).from('noreply@event.com').subject('Event')
            })
            
            responseJSON.meta.code = 201
            responseJSON.meta.status = "success"
            responseJSON.meta.message = "Email verification has been sent to "+ request.data.email + ". Please verify before expired"
            responseJSON.data = {
                account_data,
                expired_at: expired_date
            }
        }

        return response.status(responseJSON.meta.code).json(responseJSON)
    }
    async api_verification({response, params}) {
        if(!params.data){
            responseJSON.meta.code = 404
            responseJSON.meta.status = "failed"
            responseJSON.meta.message = "Invalid verification token"
        }
        else{
            const account_data = await Account.find()
            .where({
                password: params.data,
                status: false,
                deleted_at: null
            })
            
            if(account_data) {
                account_data.status = true
                await account_data.save()

                const balances = await balances.create({
                    account_id: account_data.id
                })

                responseJSON.meta.code = 200
                responseJSON.meta.status = "success"
                responseJSON.meta.message = "Email has been successfully registered"
                responseJSON.data = account_data
            }
        }

        return response.status(responseJSON.meta.code).json(responseJSON)
    }
}

module.exports = RegisterController
