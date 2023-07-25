const express = require('express')
const { postForgot, postLogin} = require('./login.controller')

const loginRouter = express.Router()
 
loginRouter.post("/",postLogin)
loginRouter.post("/forgotpassword",postForgot)

module.exports = {
    loginRouter
}