const fs = require('fs')
const path = require('path')
const nanoid = require('nanoid')
const sendForgot = require('../../Email verfications/forgot.sendmail')
const db = require('../../models/sql.model')

function getLogin(req, res){
    if(!req.user){
        return res.render("login",{Pname: ""})
    }
    res.redirect("/dashboard")
}

function postLogin(req, res){    
    if(req.user){
        return res.redirect("/")
    }
    return res.redirect("/login/illegal")
}

function logout(req, res){
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/')
    })
}

function illegalLogin(req, res){
    if(req.user){
        return res.redirect("/")
    }
    res.sendFile(path.join(__dirname,"..", "..", "public", "illegal.html"))
}

function getForgot(req,res){
    if(req.user){
        return res.redirect("/")
    }
    res.render("forgot",{Pname: ""})
}

function postForgot(req,res){
    if(!req.body.username){
        return res.status(400).send("No email")
    }
    const { username } = req.body

    db.query(`select * from users where username = '${username}'`,(err,data)=>{
        if(err){
            res.sendFile(path.join(__dirname,"..", "..", "public", "notexists.html"))
        }

        if(data.length == 0){
            res.sendFile(path.join(__dirname,"..", "..", "public", "notexists.html"))
        }
        const shortcode = nanoid()
        db.query(`update users set token='${shortcode}' where username = '${username}'`,(err,data)=>{
            if(err){
                return res.redirect("/login")
            }
            sendForgot(username, shortcode, function(err, data){
                    if(err){
                        res.render("login",{Pname: ""},{err: "Something went wrong."})
                        return
                    }

                    res.redirect("/sent")
                })
        })
    })
}

module.exports = {
    getLogin,
    postLogin,
    logout, 
    illegalLogin,
    getForgot,
    postForgot
}