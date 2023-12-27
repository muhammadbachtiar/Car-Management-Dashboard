const UsersController = require('../controllers/usersControllers')
const expressUser = require('express')
const middlewareAuthorize = require('../middleware/authorize')
const routerUser = expressUser.Router()

// API VIEW PAGE
routerUser.get('/login', middlewareAuthorize.authorize, UsersController.loginPage)
routerUser.get('/userProfile', middlewareAuthorize.authorize, UsersController.getUserProfile)
routerUser.post('/login', UsersController.login)
routerUser.post('/register', UsersController.register)
routerUser.post('/changeToAdmin/:id', middlewareAuthorize.isSuperAdmin, UsersController.memberToAdmin)

module.exports = routerUser
