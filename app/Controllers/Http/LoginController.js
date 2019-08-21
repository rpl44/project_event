'use strict'

const Hash = use('Hash')
const Account = use('App/Models/Account')
const AuthToken = use('App/Models/AuthToken')

const responseJSON = {
    meta: {
        code : 200,
        status: "success",
        message: "ok"
    },
    data: null
}

class LoginController {
    async api_login({request, response}) {
        request.data = request.all()
        if(request.data) {
            const account_data = await Account.query()
            .where({
                email: request.data.email,
                status: true,
                deleted_at: null
            })
            
            if(account_data) {
                const password_verify = await Hash.verify(request.data.password, account_data.password)
                if(password_verify) {
                    const token_data = await AuthToken.query()
                    .where({
                        account_id: account_data.account_id
                    })
                    .first()

                    responseJSON.meta.code = 200
                    responseJSON.meta.status = "success"
                    responseJSON.meta.message = "Login success"
                    responseJSON.data = {
                        access_token: token_data.access_token
                    }
                }
            }
        }

        response.status(responseJSON.meta.code).json(responseJSON)
    }
}

module.exports = LoginController
