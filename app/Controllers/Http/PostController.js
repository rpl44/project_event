'use strict'

const AuthToken = use('App/Models/AuthToken')
const Account = use('App/Models/Account')
const Post = use('App/Models/Post')

const responseJSON = {
    meta: {
        code: 200,
        status: "success",
        message: "ok"
    },
    data: null
}

class PostController {
    async api_collection({response, params}) {
        let post_data = await Post.all()
        if(params.id){
            post_data = await Post.find(params.id)
        }
        if(post_data){
            responseJSON.meta.code = 200
            responseJSON.meta.status = "success"
            responseJSON.meta.message = "Showing list of post "+ params.id? "with ID: "+ params.id : ""
            responseJSON.data = post_data
        }
        else{
            responseJSON.meta.code = 404
            responseJSON.meta.status = "failed"
            responseJSON.meta.message = "Post data not found"
            responseJSON.data = post_data
        }

        return response.status(responseJSON.meta.code).json(post_data)
    }

    async api_create({request, response}) {
        request.data = request.all()
        if(request.data) {
            const account_token = await AuthToken.query()
            .where({
                client_token: request.header('Authorization').split(" ")[1]
            })
            if(account_token){
                const account_data = await Account.query()
                .where({
                    id: account_token.account.id,
                    status: true,
                    deleted_at: null
                })
                if(account_data){
                    const post_data = await Post.create({
                        account_id: account_data.id,
                        title: request.data.title,
                        description: request.data.description
                    })

                    responseJSON.meta.code = 201
                    responseJSON.meta.status = "success"
                    responseJSON.meta.message = "The post has been published"
                    responseJSON.data = post_data
                }
            }
        }

        return response.status(responseJSON.meta.code).json(responseJSON)
    }

    async api_update({request, response, params}){
        if(params.id){
            request.data = request.all()
            if(request.data){
                const account_token = await Account.query()
                .where({
                    client_token: request.header('Authorization').split(" ")[1]
                })
                if(account_token){
                    const account_data = await Account.query()
                    .where({
                        id: account_token.account_id,
                        status: true,
                        deleted_at: null
                    })
                    if(account_data){
                        const post_data = await Post.query()
                        .where({
                            id: params.id,
                            deleted_at: null
                        })
                        if(post_data){
                            post_data.title = request.data.title
                            post_data.description = request.data.description
                            await post_data.save()

                            responseJSON.meta.code = 200
                            responseJSON.meta.status = "success"
                            responseJSON.meta.message = "Post has been updated"
                            responseJSON.data = post_data
                        }
                    }
                }
            }
        }

        return response.status(responseJSON.meta.code).json(responseJSON)
    }

    async api_delete({params, response}){
        if(params.id){
            const account_token = await AuthToken.query()
            .where({
                client_token: request.header('Authorization').split(" ")[1]
            })
            if(account_token){
                const account_data = await Account.query()
                .where({
                    id: account_token.account_id,
                    status: true,
                    deleted_at: null
                })
                if(account_data){
                    const post_data = await Post.find(params.id)
                    if(post_data){
                        const deleted_at = new Date()
                        post_data.deleted_at = deleted_at
                        await post_data.save()

                        responseJSON.meta.code = 200
                        responseJSON.meta.status = "success"
                        responseJSON.meta.message = "Post has been deleted"
                        responseJSON.data = post_data
                    }
                }
            }
        }

        return response.status(responseJSON.meta.status).json(responseJSON)
    }
}

module.exports = PostController
