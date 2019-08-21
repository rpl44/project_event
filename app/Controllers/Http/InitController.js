'use strict'

const Config = use('Config')
const CryptoJS = require('crypto-js')
const AuthToken = use('App/Models/AuthToken')

const responseJSON = {
    meta: {
        code: 400,
        status: "error",
        message: null
    },
    data: null
}

class InitController {
    async api_initialize({request, response}) {
        request.data = request.all()
        
        const token_data = await AuthToken.query()
        .where({
            account_id: request.data.id,
            secret: request.data.secret
        })
        .first()

        if(!token_data) {
            responseJSON.meta.code = 401
            responseJSON.meta.status = "error"
            responseJSON.meta.message = "Invalid client ID or token"
            responseJSON.data = []
        }
        else{
            const generate_token = CryptoJS.AES.encrypt(request.data.account_id + request.data.secret, Config.get('app.aes_key')).toString()
            const jsonObject = {
                account_id: request.data.account_id,
                secret: request.data.secret,
                access_token: generate_token
            }

            const date = new Date()
            const expired_at = `${date.getFullYear()+1}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
            
            const generate_refresh = CryptoJS.AES.encrypt(request.data.account_id + request.data.secret, Config.get('app.aes_key')).toString()

            token_data.access_token = generate_token
            token_data.refresh_token = generate_refresh
            token_data.expired_at = expired_at

            await token_data.save()

            const cipherText = CryptoJS.AES.encrypt(JSON.stringify(jsonObject), Config.get('app.aes_key')).toString()

            responseJSON.meta.code = 200
            responseJSON.meta.status = "success"
            responseJSON.meta.message = "initialization success"
            responseJSON.data = {
                secret: request.data.secret,
                access_token: cipherText,
                refresh_token: generate_refresh
            }
        }
        return response.status(responseJSON.meta.code).json(responseJSON)
    }
}

module.exports = InitController
