const nanoid = require('nanoid')
const utils = require('../../utility/utils.js')
const sendForgot = require('../../Email verfications/forgot.sendmail')
const db = require('../../models/sql.model')

function postLogin(req,res){
    const {email, password} = req.body

    db.query(`select * from users where username = '${email}'`,(err,data) =>{
        if(err){
            return res.status(500).send("Something went wrong.Try again later.")
        }
        if(data.length == 0){
            return res.status(404).send("Account with this email do not exists")
        }
        
        if(data[0].password != password){
            return res.status(400).send("Password mismatch")
        }

        const user = {...data[0]}
        delete user.password
        delete user.token
           
        const jwt = utils.issueJWT(user)
        res.status(201).send({ok : true, user:user,token:jwt.token,expiresIn: jwt.expires})
    })
}

function postForgot(req,res){
    const { username } = req.body

    db.query(`select * from users where username = '${username}'`,(err,data)=>{
        if(err){
            return res.status(500).send("Something went wrong.Try again later.")
        }

        if(data.length == 0){
            return res.status(404).send("Account not found")
        }
        const shortcode = nanoid()
        db.query(`update users set token='${shortcode}' where username = '${username}'`,(err,data)=>{
            if(err){
                return res.status(500).send("Something went wrong.Try again later.")
            }
            sendForgot(username, shortcode)
            return res.status(200).send({ok: true})
        })
    })
}

module.exports = {
    postLogin,
    postForgot,
}