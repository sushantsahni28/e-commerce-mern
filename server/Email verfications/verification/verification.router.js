const express = require('express')
const { verifyEmailToken } = require('./verification.controller')

const verifyRouter = express.Router()

verifyRouter.post("/", verifyEmailToken)

module.exports = {
    verifyRouter
}