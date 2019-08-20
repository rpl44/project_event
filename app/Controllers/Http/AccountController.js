'use strict'

const Account = use('App/Models/Account')
const AuthToken = use('App/Models/AuthToken')

const responseJSON = {
    meta: {
        code: 200,
        status: "success",
        message: "ok"
    },
    data: null
}

class AccountController {
    async api_collection({response, params}) {
        let account_data = await Account.all()
        if(params.id){
            account_data = await Account.find(params.id)
        }
        if(!account_data){
            responseJSON.meta.code = 404
            responseJSON.meta.status = "failed"
            responseJSON.meta.message = "Account data not found"
            responseJSON.data = []
        }
        else{
            responseJSON.meta.code = 200
            responseJSON.meta.status = "success"
            responseJSON.meta.message = "Showing list of account" + (params.id)? "with ID: " + params.id : ""
            responseJSON.data = account_data
        }

        return response.status(responseJSON.meta.code).json(responseJSON)
    }

    async api_update({request, response}) {
        request.data = request.all()
        if(request.data){
            const account_token = await AuthToken.query()
            .where({
                client_token: request.header("Authorization").split(" ")[1]
            })
            .first()

            if(account_token) {
                const account_data = await Account.find(account_token.id)
                if(account_data) {
                    account_data.name = request.data.name
                    account_data.username = request.data.username
                    account_data.password = request.data.password
                    account_data.email = request.data.email
                    account_data.phone = request.data.phone
                    if(request.data.avatarUrl) {
                        account_data.avatarUrl = request.data.avatarUrl
                    }
                    await account_data.save()

                    responseJSON.meta.code = 200
                    responseJSON.meta.status = "success"
                    responseJSON.meta.message = "Account data has been updated"
                    responseJSON.data = account_data
                }
            }
        }

        return response.status(responseJSON.meta.code).json(responseJSON)
    }

    async api_delete({request, response}) {
        const account_token = await AuthToken.query()
        .where({
            client_token: request.header('Authorization').split(" ")[1]
        })
        .first()
    
        if(account_token) {
            const account_data = await Account.query()
            .where({
                status: true,
                deleted_at: null
            })
            if(account_data){
                const deleted_at = new Date()
                account_data.deleted_at = deleted_at

                await account_data.save()

                responseJSON.meta.code = 200
                responseJSON.meta.status = "success"
                responseJSON.meta.message = "Account data has been deleted"
                responseJSON.data = account_data
            }
        }
        
        return response.status(responseJSON.meta.code).json(responseJSON)
    }
}

module.exports = AccountController
