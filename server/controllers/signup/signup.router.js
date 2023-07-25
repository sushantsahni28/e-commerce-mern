const express = require('express')
const { postSignup } = require('./signup.controller')

const signupRouter = express.Router()

signupRouter.post("/",postSignup)

module.exports = {
    signupRouter,
}