const fs = require('fs')
const path = require('path')
const db = require('../../models/sql.model')

function verifyEmailToken(req, res){
    const { token } = req.params
    
    if(!token){
        res.redirect("/")
    }
    db.query(`select * from users where token='${token}'`, (err,data) =>{
        if(err){
            return res.redirect('/change/tryagain')
        }
        if(data.length == 0){
            return res.redirect('/invalidtoken')
        }

        db.query(`update users set token='' ,verified=1 where token='${token}'`,(err,data) => {
            if(err){
                return res.redirect('/change/tryagain')
            }

            res.redirect('/verification/verified')
        })
    })
}

function verifiedEmail(req, res){
    res.sendFile(path.join(__dirname,"..","..","public","verifiedemail.html"))
}

module.exports = {
    verifyEmailToken,
    verifiedEmail
}