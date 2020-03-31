'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
/*
Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})*/

const Helpers = use('Helpers')
const fs = use('fs')
const readFile = Helpers.promisify(fs.readFile)

Route.post('/user', 'UserController.create')
Route.post('/login', 'UserController.login')

Route.resource('tarefa', 'TarefaController').apiOnly().middleware('auth')

Route.post('/tarefa/:id/arquivo', 'ArquivoController.create').middleware('auth')

Route.get('/files/:id', async ({ request, response }) => {
  const local = Helpers.publicPath('arquivos') + '/' + request.params.id;
  console.log(local);
  return await readFile(local)
})
