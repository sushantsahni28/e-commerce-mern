const express = require('express')
const multer = require("multer")
const upload = multer({ dest: 'uploads/' })

const { adminPannel, getAllProducts, reqUpdate, 
    reqDelete, addNewProduct } = require('./admin.controller')

const adminRouter = express.Router()
 
adminRouter.get("/", adminPannel)
adminRouter.get("/allproducts", getAllProducts)
adminRouter.post("/updateproduct", reqUpdate)
adminRouter.post("/deleteproduct", reqDelete)
adminRouter.post("/addproduct", upload.single("picture"), addNewProduct)


module.exports = {
    adminRouter
}