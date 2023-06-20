const express = require('express')
const { products, addToCart, Cart, getCartItems, 
    cartItemInfo, changeQuantity, deleteCartItem } = require('./product.controller')

const productRouter = express.Router()

productRouter.post("/addtocart", addToCart)
productRouter.get("/cart", Cart)
productRouter.get("/cartitems", getCartItems)
productRouter.post("/info", cartItemInfo)
productRouter.post("/change", changeQuantity)
productRouter.post("/delete", deleteCartItem)
productRouter.get("/:start",products)

module.exports = {
    productRouter
}