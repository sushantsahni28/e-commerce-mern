const express = require('express')
const { getLogin, postLogin, illegalLogin, getForgot, postForgot } = require('./login.controller')
const passport = require('../../strategies/local')

const loginRouter = express.Router()

loginRouter.get("/",getLogin)
loginRouter.post("/",passport.authenticate('local',{ failureRedirect: '/login/illegal', failureMessage: true }),postLogin)
loginRouter.get("/illegal",illegalLogin)
loginRouter.get("/forgotpassword",getForgot)
loginRouter.post("/forgotpassword",postForgot)

module.exports = {
    loginRouter
}