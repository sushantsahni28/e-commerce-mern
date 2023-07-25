const express = require('express')
const passport = require('passport')
const { changeOldPass, changePwd } = require("./forgot.controller")

const changeRouter = express.Router()
 
changeRouter.post("/old",passport.authenticate('jwt',{session:false}), changeOldPass)
changeRouter.post("/", changePwd)

module.exports = {
    changeRouter
}