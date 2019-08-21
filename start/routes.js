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
Route.on('/partner').render('partner')

Route.group(() =>{
    
    // [ Initialization ]
    Route.post('/init_token', 'InitController.api_initialize')

    // [ Register ]    
    Route.post('/register', 'RegisterController.api_register')
    Route.post('/register/confirm/:data?', 'RegisterController.api_verification')

    // [ Login ]
    Route.post('/login', 'LoginController.api_login')

    // [ Account ]
    Route.get('/account', 'AccountController.api_collection')
    Route.get('/account/:id', 'AccountController.api_collection')
    Route.put('/account/update/:id', 'AccountController.api_update')
    Route.delete('/account/delete/:id', 'AccountController.api_delete')

    // [ Event ]
    Route.get('/event/', 'EventController.api_collection')
    Route.get('/event/:id', 'EventController.api_collection')
    Route.post('/event/create', 'EventController.api_create')
    Route.put('/event/update/:id', 'EventController.api_update')
    Route.delete('/event/delete/:id', 'EventController.api_data')

    // [ Post ]
    Route.get('/post/', 'PostController.api_collection')
    Route.get('/post/:id', 'PostController.api_collection')
    Route.post('/post/create', 'PostController.api_create')
    Route.put('/post/update/:id', 'PostController.api_update')
    Route.delete('/post/delete/:id', 'PostController.api_delete')
        
}).prefix('api/v1')

Route.post('/check', 'RegisterController.check').as('checkemail')

Route.post('/register','AuthController.add_account')
