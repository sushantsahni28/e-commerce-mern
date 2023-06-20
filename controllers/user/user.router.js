const express = require('express')
const { dashboard } = require('./user.controller')

const userRouter = express.Router()

userRouter.get("/", dashboard)

module.exports = {
    userRouter
}