const fs = require('fs')
const path = require('path')
const db = require('../../models/sql.model')

function products(req, res){
    let i = parseInt(req.params.start) 
    
    const query = "select * from products"

    db.query(query, (err,data) => {
        if(err) return res.json(err)

        const allprods = data 
        var prods = []

        var end = allprods.length < i+5 ? allprods.length : i+5

        for(let j=i; j<end; j++){
            prods.push(allprods[j])
        }
    
        res.end(JSON.stringify(prods))
    })
}

function addToCart(req, res){
    if(!req.user){
        return res.end("login")
    }
    if(req.user[0].verified == 0){
        return res.end("notVerified")
    }
    const { prodid } = req.body
    const username = req.user[0].username
    let count = 0

    db.query(`select quantity from carts where username='${username}' and productid=${prodid}`,(err,data) => {
        if(err){
            throw err
        }
        if(data.length == 0){
            db.query(`insert into carts(username, productid, quantity) values ('${username}',${prodid},1)`,(err,data) =>{
                if(err){
                    throw err;
                }
                count=1
                return res.end(JSON.stringify(count))
            })
        }
        else{
            return res.end("present")
        }
    })
}

function Cart(req, res){
    if(!req.user){
        return res.redirect("/")
    }
    if(req.user && req.user[0].verified == 0){
        return res.redirect("/pending")
    }
    res.render("cart", {user: req.user[0]})
}

function getCartItems(req, res){
    if(!req.user){
        return res.end("login")
    }
    const username  = req.user[0].username
    db.query(`select productid,quantity from carts where username='${username}'`,(err,data) => {
        if(err){
            throw err
        }

       return res.json(data)
    })
}

function cartItemInfo(req, res){
    const {prodid} = req.body

    db.query(`select * from products where id=${prodid}`,(err,data) => {
        if(err){
            throw err
        }
        res.json(data[0])
    })
}

function changeQuantity(req,res){
    const {itemid, itemquantity} = req.body
    const { username } = req.user[0]

    db.query(`update carts set quantity=${itemquantity} where username='${username}' and productid=${itemid}`,(err,data) => {
        if(err){
            throw err
        }
        res.end()
    })
}

function deleteCartItem(req, res){
    const {itemid} = req.body
    const  {username}  = req.user[0]

    db.query(`delete from carts where username='${username}' and productid=${itemid}`,(err,data) => {
        if(err){
            throw err
        }
        res.end()
    })
}

module.exports = {
    products,
    addToCart,
    Cart,
    getCartItems,
    cartItemInfo,
    changeQuantity,
    deleteCartItem
}