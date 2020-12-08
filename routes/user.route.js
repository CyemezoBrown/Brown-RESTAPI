const {register,login} = require('../controllers/user.controller');
const { Router } = require("express")
const user = new Router(); 

    user.post('/register', register);
    user.post('/login',  login)

module.exports = user;


// const userroutes = function(app) {
   
// app.post('/api/user/register', userController.register);
// app.post('/api/user/login',  userController.login);
// };
// module.exports = userroutes
