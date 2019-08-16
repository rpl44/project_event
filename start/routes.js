'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('index')
Route.on('/static').render('static')
Route.on('/login').render('login')
Route.on('/register').render('register')

Route.group(() =>{
    
    // [ INITIALIZATION ]
    Route.get('/init_token', 'ApiController.initialize')

    // [ LOGIN & REGISTER & CONFIRM ]
    Route.post('/login', 'ApiController.login')
    Route.post('/register', 'ApiController.register')
    Route.get('/register/confirm/:confirm?', 'ApiController.confirm_token')

    // [============================================ [ CORE DATA ] =================================================]
        // [ ACCOUNT ]
        Route.get('/account', 'ApiController.account_data')
        Route.get('/account/:id', 'ApiController.account_data')
        Route.put('/account/update/:id', 'ApiController.account_update')
        Route.delete('/account/delete/:id', 'ApiController.account_delete')

        // [ EVENT ]
        Route.get('/event/:id?', 'ApiController.event_data')

        // [ FEED & POST ]
        Route.get('/post/:id?', 'ApiController.post_data')
    
    // [============================================ [ CORE DATA ] =================================================]
        
}).prefix('api/v1')

Route.post('/register','AuthController.add_account')
