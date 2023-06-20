const path = require('path')
const fs = require('fs')
const multer = require('multer')
const db = require('../../models/sql.model')
const upload = multer({ dest: 'uploads/' })


function adminPannel(req,res){
    if(!req.user){
        return res.redirect("/login")
    }
    if(req.user[0].username != "admin28@ecommerce.com" && req.user[0].verified != 2){
        return res.sendFile(path.join(__dirname,"..","..","public","unauthorized.html"))
    }
    res.sendFile(path.join(__dirname,"..","..","public", "admin.html"))
}

function getAllProducts(req,res){
    db.query(`select * from products`,(err,data) => {
        if(err){
            throw err
        }
        res.json(data)
    })
}

function reqUpdate(req,res){
    const {id, name, price, description, quantity} = req.body

    db.query(`update products set name='${name}', price=${price}, description='${description}', quantity=${quantity} where id=${id}`,(err,data) => {
        if(err){
            throw err
        }
        res.end()
    })
}

function reqDelete(req,res){
    const {id} = req.body
    
    db.query(`delete from products where id=${id}`,(err,data) => {
        if(err){
            res.end("cart")
        }
        res.end()
    })
}
function addNewProduct(req,res){

    const {name, description, price, quantity} = req.body
    const image = "/"+req.file.filename
    const id = Date.now()%15391
    
    let values = [id, name, description, price, quantity, image]
    const query = `insert into products values(?)`

    db.query(query, [values], (err,data) => {
        if(err){
            throw err
        }
        db.query(`select * from products where id =${id}`,(err,data) => {
            res.json(data[0])
        })
    })
}
module.exports = {
    adminPannel,
    getAllProducts,
    reqUpdate,
    reqDelete,
    addNewProduct
}