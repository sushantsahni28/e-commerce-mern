const db = require('../../models/sql.model')

function getAllProducts(req,res){
    if(req.user.username != "admin28@ecommerce.com")
    {
        return res.status(403).send("Unauthorized")
    }
    db.query(`select * from products`,(err,data) => {
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

function reqUpdate(req,res){
    if(req.user.username != "admin28@ecommerce.com")
    {
        return res.status(403).send("Unauthorized")
    }

    const {id, name, price, description, quantity} = req.body

    db.query(`update products set name='${name}', price=${price}, description='${description}', quantity=${quantity} where id=${id}`,(err,data) => {
        if(err){
            return res.status(500).send("Something went wrong. Try again later.")
        }
        res.status(200).send({ok: true})
    })
}

function reqDelete(req,res){
    if(req.user.username != "admin28@ecommerce.com")
    {
        return res.status(403).send("Unauthorized")
    }

    const {id} = req.body
    
    db.query(`delete from products where id=${id}`,(err,data) => {
        if(err){
            return res.status(500).send("Something went wrong. Try again later.")
        }
        res.status(200).send({ok:true})
    })
}
function addNewProduct(req,res){
    if(req.user.username != "admin28@ecommerce.com")
    {
        return res.status(403).send("Unauthorized")
    }

    const {name, description, price, quantity} = req.body
    const image = "/"+req.file.filename

    const id = Date.now()%15391
    
    let values = [id, name, description, price, quantity, image]
    const query = `insert into products values(?)`

    db.query(query, [values], (err,data) => {
        if(err){
            return res.status(500).send("Something went wrong. Try again later.")
        }
        db.query(`select * from products where id =${id}`,(err,data) => {
            if(err){
                return res.status(500).send("Something went wrong. Try again later.")
            }
            
            const result = {...data[0]}
            return res.status(200).json(result)
        })
    })
}
module.exports = {
    getAllProducts,
    reqUpdate,
    reqDelete,
    addNewProduct
}