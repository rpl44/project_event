'use strict'

const Event = use('App/Models/Event')
const Account = use('App/Models/Account')
const AuthToken = use('App/Mpdels/AuthToken')

const responseJSON = {
    meta: {
        code: 200,
        status: "success",
        message: "ok"
    },
    data: null
}

class EventController {
    async api_collection({response, params}) {
        let event_data = await Event.all()
        if(params.id){
            event_data = await Event.find(params.id)
        }
        if(!event_data){
            responseJSON.meta.code = 404
            responseJSON.meta.status = "failed"
            responseJSON.meta.message = "Event data not found"
            responseJSON.data = []
        }
        else{
            responseJSON.meta.code = 200
            responseJSON.meta.status = "success"
            responseJSON.meta.message = "Showing list of account " + params.id? "with ID: " + params.id : ""
            responseJSON.data = event_data
        }

        return response.status(responseJSON.meta.code).json(responseJSON)
    }

    async api_create({request, response}){
        request.data = request.all()
        if(request.data){
            const account_token = await AuthToken.query()
            .where({
                client_token: request.header("Authorization").split(" ")[1]
            })
            if(account_token){
                const account_data = await Account.query()
                .where({
                    id: account_token.account_id,
                    status: true,
                    deleted_at: null
                })
                if(account_data){
                    const event_data = await Event.create({
                        account_id: account_data.id,
                        title: request.data.title,
                        description: request.data.description,
                        price: request.data.price,
                        time: request.data.time
                    })
        
                    responseJSON.meta.code = 201
                    responseJSON.meta.status = "success"
                    responseJSON.meta.message = "Event has been created"
                    responseJSON.data = event_data
                }
            }
        }
        return response.status(responseJSON.meta.code).json(responseJSON)
    }

    async api_update({request, response, params}) {
        if(params.id) {
            request.data = request.all()
            if(request.data) {
                const account_token = await AuthToken.query()
                .where({
                    client_token: request.header("Authorization").split(" ")[1]
                })
                if(account_token){
                    const account_data = await Account.query()
                    .where({
                        id: account_token.account_id
                    })
                    if(account_data){
                        const event_data = await Event.query()
                        .where({
                            id: params.id,
                            account_id: account_data.id,    
                            deleted_at: null
                        })
                        if(event_data){
                            event_data.title = request.data.title
                            event_data.description = request.data.description
                            event_data.price = request.data.price
                            event_data.time = request.data.time
        
                            await event_data.save()
        
                            responseJSON.meta.code = 200
                            responseJSON.meta.status = "success"
                            responseJSON.meta.message = "Event has been updated"
                        }
                    }
                }
            }
        }

        return response.status(responseJSON.meta.code).json(responseJSON)
    }

    async api_delete({request, response, params}){
        if(params.id){
            const account_token = await AuthToken.query()
            .where({
                client_token: request.header('Authorization').split(" ")[1]
            })
            if(account_token){
                const account_data = await Account.find()
                .where({
                    id: account_token.account_id,
                    status: true,
                    deleted_at: null
                })
                if(account_data){
                    const event_data = await Event.find()
                    .where({
                        id: params.id,
                        account_id: account_data.id,
                        deleted_at: null
                    })
                    if(event_data){
                        const deleted_at = new Date()
                        event_data.deleted_at = deleted_at
                        await event_data.save() 

                        responseJSON.meta.code = 200
                        responseJSON.meta.status = "success"
                        responseJSON.meta.message = "Event has been deleted"
                        responseJSON.data = event_data
                    }
                }
            }
        }

        return response.status(responseJSON.meta.message).json(responseJSON)
    }
}

module.exports = EventController
