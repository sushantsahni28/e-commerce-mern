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
    
        res.json(prods)
    })
}

function addToCart(req, res){ 
    const { prodid } = req.body
    const username = req.user.username

    db.query(`select quantity from carts where username='${username}' and productid=${prodid}`,(err,data) => {
        if(err){
            return res.status(500).send("Something went wrong. Try again later.")
        }
        if(data.length == 0){
            db.query(`insert into carts(username, productid, quantity) values ('${username}',${prodid},1)`,(err,data) =>{
                if(err){
                    return res.status(500).send("Something went wrong. Try again later.")
                }
                count=1
                return res.status(200).send({ok: true})
            })
        }
        else{
            return res.status(200).send({ok: false})
        }
    })
}


function getCartItems(req, res){
    const username  = req.user.username

    db.query(`select c.productid,c.quantity as cartquantity,p.name, p.description, p.price, p.quantity,p.image from carts c join products p on p.id = c.productid where username='${username}'`,(err,data) => {
        if(err){
            return res.status(500).send("Something went wrong. Try again later.")
        }
        
        const results = []

        for(let i=0; i<data.length; i++){
            results.push({...data[i]})
        }
        return res.status(200).json(results)
    })
}

function changeQuantity(req,res){
    const {itemid, itemquantity} = req.body
    const username = req.user.username

    db.query(`update carts set quantity=${itemquantity} where username='${username}' and productid=${itemid}`,(err,data) => {
        if(err){
            return res.status(500).send("Something went wrong. Try again later.")
        }
        return res.status(200).send({ok : true})
    })
}

function deleteCartItem(req, res){
    const {itemid} = req.body
    const username = req.user.username

    db.query(`delete from carts where username='${username}' and productid=${itemid}`,(err,data) => {
        if(err){
            return res.status(500).send("Something went wrong. Try again later.")
        }
        return res.status(200).send({ok : true})
    })
}

module.exports = {
    products,
    addToCart,
    getCartItems,
    changeQuantity,
    deleteCartItem
}