'use strict'

const Mail = use('Mail')
const Account = use('App/Models/Account')
const AuthToken = use('App/Models/AuthToken')
const Address = use('App/Models/Address')
const Balance = use('App/Models/Balance')
const Permission = use('App/Models/Permission')
const {randomString} = use('App/Helpers')

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
            const generate_verify = randomString(20)
            const address_data = await Address.create()
            const account_data = await Account.create({
                address_id: address_data.id,
                username: request.data.username,
                password: request.data.password,
                email: request.data.email,
                name: request.data.name,
                phone: request.data.phone,
                verification_code: generate_verify,
                avatarUrl: request.data.avatarUrl
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
                account: {
                    id: account_data.id,
                    address_id: address_data.id,
                    username:account_data.username,
                    email: account_data.email,
                    name: account_data.name,
                    phone: account_data.phone || null
                },
                expired_at: expired_date,
                verification_link: `${process.env.APP_URL}/api/v1/register/confirm/${generate_verify}`
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

            const account_data = await Account.query()
            .where({
                verification_code: params.data,
                status: false,
                deleted_at: null
            })
            .first()
            if(account_data) {
                account_data.status = true
                await account_data.save()
                const permission_data = await Permission.find(account_data.permission_id)
                
                const secret_key = randomString(20)

                const balances = await Balance.create({
                    account_id: account_data.id
                })

                const token = await AuthToken.create({
                    account_id: account_data.id,
                    secret: secret_key 
                })

                responseJSON.meta.code = 200
                responseJSON.meta.status = "success"
                responseJSON.meta.message = "Email has been successfully registered"
                responseJSON.data = {
                    account: {
                        id: account_data.id,
                        address_id: account_data.address_id,
                        permission: permission_data.permission_name,
                        username: account_data.username,
                        email: account_data.email,
                        name: account_data.name,
                        phone: account_data.phone,
                        avatarUrl: account_data.avatarUrl
                    },
                    secret: token.secret
                }
            }
            else{
                responseJSON.meta.code = 400
                responseJSON.meta.status = "error"
                responseJSON.meta.message = "Invalid email verification token"
                responseJSON.data = []
            }
        }

        return response.status(responseJSON.meta.code).json(responseJSON)
    }
}

module.exports = RegisterController
