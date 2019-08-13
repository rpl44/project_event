'use strict'

const account = use('App/Models/Account')
const {validate} = use('Validator')

class AuthController {
    async add_account({request,session,response}){
        
        //validation
        const validation = await validate(request.all(),{
            in_name:'required',
            in_username: `required|unique:accounts.username`,
            in_password:'required'
        })

        if(validation.fails()){
            console.log(validation.messages())
            session.withErrors(validation.messages()).flashAll()
            return response.redirect('back')
        }
        //endvalidation
        //data-to-database
        
    }
}

module.exports = AuthController
