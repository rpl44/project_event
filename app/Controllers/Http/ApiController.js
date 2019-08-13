'use strict'

const Hash = use('Hash')
const Account = use('App/Models/Account')
const AuthToken = use('App/Models/AuthToken')
const Address = use('App/Models/Address')

class ApiController {
    randomString(string_length){
        var result = "";
        var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
        for(var i = 0; i<string_length; i++){
            result += characters.charAt(Math.floor(Math.random() * characters.length))
        }
        return result
    }

    async index({response}){
        const account_data = await Account.all()
        return response.status(200).json(account_data)
    }
    async register({request, response}){
        const account_request = await request.only(['name', 'username', 'password'])
        if(!account_request) return response.json({error: "please insert [name, username, password]"})
        const address = await Address.create()
        
        const account = await Account.create({
            username: account_request.username,
            password: account_request.password,
            name: account_request.name,
        })

        const token = await AuthToken.create({
            client_token: this.randomString(15)
        })
        return response.status(201).json({account, token});
    }
    async login({request, response}){
        const account_request = await request.only(['username', 'password', 'client_token']);
        if(!account_request) return response.json({error: "invalid username, password, or client_token"})
        const account_data = await Account.query().where('username', account_request.username).first()
        if(account_data){
            const verify_password = await Hash.verify(account_request.password, account_data.password)
            if(verify_password){
                return response.status(200).json({message: "authorization complete"})
            }
        }
        return response.json({error: "data not found or something wrong"})
    }
}

module.exports = ApiController
