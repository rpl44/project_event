'use strict'

const Hash = use('Hash')
const Account = use('App/Models/Account')
const Address = use('App/Models/Address')
const AuthToken = use('App/Models/AuthToken')
const {validate} = use('Validator')

class AuthController {
   
    randomString(string_length){
        var result = "";
        var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
        for(var i = 0; i<string_length; i++){
            result += characters.charAt(Math.floor(Math.random() * characters.length))
        }
        return result
    }
    
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

        //address data
        new_account_data = request.all()
        const address = new Address()
        await address.save()
        
        //account data
        const account = new Account()
        account.name = new_account_data.in_name
        account.username = new_account_data.in_username
        account.password = new_account_data.in_password
        account.address_id = address.id
        await account.save()
        //enddata-to-database
        
        console.log("a new account has been added")
        session.flash({ notification: 'Your account have been successfully registered' })
        return response.redirect('back')
        
    }

    async account_login({}){
        
    }
}

module.exports = AuthController
