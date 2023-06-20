const express = require('express')
const { verifyEmailToken, verifiedEmail } = require('./verification.controller')

const verifyRouter = express.Router()

verifyRouter.get("/verified", verifiedEmail)
verifyRouter.get("/:token", verifyEmailToken)

module.exports = {
    verifyRouter
}