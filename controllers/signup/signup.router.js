const express = require('express')
const { getSignup, postSignup, emailExists, emailVerify } = require('./signup.controller')

const signupRouter = express.Router()

signupRouter.get("/",getSignup)
signupRouter.post("/",postSignup)
signupRouter.get("/exists",emailExists)
signupRouter.get("/sent_verify",emailVerify)

module.exports = {
    signupRouter,
}