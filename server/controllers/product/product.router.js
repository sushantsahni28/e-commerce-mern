const express = require('express')
const { products, addToCart, getCartItems, changeQuantity, deleteCartItem } = require('./product.controller')
const passport = require('passport')

const productRouter = express.Router()

productRouter.post("/addtocart",passport.authenticate('jwt',{session:false}),addToCart)
productRouter.get("/cartitems",passport.authenticate('jwt',{session:false}), getCartItems)
productRouter.post("/change", passport.authenticate('jwt',{session:false}),changeQuantity)
productRouter.post("/delete",passport.authenticate('jwt',{session:false}), deleteCartItem)
productRouter.get("/:start",products)

module.exports = {
    productRouter
}