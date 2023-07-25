const express = require('express')
const multer = require("multer")
const upload = multer({ dest: 'uploads/' })

const { getAllProducts, reqUpdate, 
    reqDelete, addNewProduct } = require('./admin.controller')
const passport = require('passport')

const adminRouter = express.Router()
 
adminRouter.get("/allproducts",passport.authenticate('jwt',{session:false}), getAllProducts)
adminRouter.post("/updateproduct",passport.authenticate('jwt',{session:false}), reqUpdate)
adminRouter.post("/deleteproduct",passport.authenticate('jwt',{session:false}), reqDelete)
adminRouter.post("/addproduct", upload.single("picture"),passport.authenticate('jwt',{session:false}), addNewProduct)


module.exports = {
    adminRouter
}