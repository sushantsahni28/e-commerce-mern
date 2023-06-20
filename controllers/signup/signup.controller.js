const fs = require('fs')
const path = require('path')
const nanoid = require('nanoid')
const verifyEmail = require('../../Email verfications/signup.sendmail')
const db = require('../../models/sql.model')

function getSignup(req,res){
    var Pname = ""
    if(!req.user){
        return res.render("signup",{Pname})
    }
    res.redirect("/")
}

function postSignup(req,res){
        const {name, username, password, contact, gender} = req.body
        if(name == "" || username == "" || password == "" || contact == ""
            || gender == "" ){
            return res.send("All fields should contain data")            
        }
        
        const shortcode = nanoid()
        
        const insert = "insert into users (name,username,password,contact,gender,token) values(?)"
        const values = [
            name,
            username,
            password,
            contact,
            gender,
            shortcode
        ]

        db.query(insert, [values], (err,data)=>{
            if(err){
                return res.redirect("/signup/exists")
            }
            verifyEmail(username, name, shortcode, function(err, data){
            if(err){
                res.render("signup",{Pname: ""},{err: "Something went wrong."})
                return
            }
            res.redirect("/signup/sent_verify")
            })
        })
}


function emailExists(req, res){
    if(req.user){
        return res.redirect("/")
    }
    res.sendFile(path.join(__dirname,"..","..","public", "exists.html"))
}

function emailVerify(req, res){
    if(!req.user){
        return res.sendFile(path.join(__dirname,"..","..","public", "verify.html"))
    }
    res.redirect("/")
}

module.exports = {
    getSignup,
    postSignup,
    emailExists,
    emailVerify
}