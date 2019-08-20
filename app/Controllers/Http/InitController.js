'use strict'

const AuthToken = use('App/Models/AuthToken')

const responseJSON = {
    meta: {
        code: 200,
        status: "success",
        message: "ok"
    },
    data: null
}

class InitController {
    async api_initialize({request, response}) {
        request.data = request.all()
        
        const account_data = await AuthToken.query()
        .where({
            id: request.data.user_id,
            client_token: request.data.client_token
        })
        .first()

        if(!account_data) {
            responseJSON.meta.code = 401
            responseJSON.meta.status = "failed"
            responseJSON.meta.message = "Invalid client ID or token"
            responseJSON.data = []
        }
        else{
            responseJSON.meta.code = 200
            responseJSON.meta.status = "success"
            responseJSON.meta.message = "initialization success"
            responseJSON.data = account_data
        }

        return response.status(responseJSON.meta.code).json(responseJSON)
    }
}

module.exports = InitController
