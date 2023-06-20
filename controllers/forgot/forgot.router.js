const express = require('express')
const { getChangepwd, postChangepwd, tryAgain, 
    successPwd, changeOldPass, matchedPwd, notmatchedPwd } = require("./forgot.controller")

const changeRouter = express.Router()

changeRouter.post("/", postChangepwd)
changeRouter.get("/tryagain", tryAgain)
changeRouter.get("/success", successPwd)
changeRouter.post("/old", changeOldPass)
changeRouter.get("/matched", matchedPwd)
changeRouter.get("/nomatched", notmatchedPwd)
changeRouter.get("/:token", getChangepwd)

module.exports = {
    changeRouter
}