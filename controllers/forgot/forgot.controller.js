const path = require('path')
const db = require('../../models/sql.model')

function getChangepwd(req, res){
    const { token } = req.params
  
    db.query(`select * from users where token='${token}'`,(err,data) =>{
        if(err){
            return res.redirect('/login')
        }
        if(data.length == 0){
            return res.redirect('/invalidtoken')
        }
        req.session.temptoken = token
        res.render("newpassword",{Pname: ""})
    }) 
}

function postChangepwd(req, res){
    const { password } = req.body
    
    db.query(`update users set password='${password}',token='' where token='${req.session.temptoken}'`,(err,data) =>{
        if(err){
            return res.redirect('/login')
        }
        if(data.length == 0){
            return res.redirect('/change/tryagain')
        }
        res.redirect("/change/success")
    })    
}

function tryAgain(req, res){
    if(req.user){
        return res.redirect("/")        
    }
    res.sendFile(path.join(__dirname,"..","..","public","tryagain.html"))
}

function successPwd(req, res){
    if(req.user){
        return res.redirect("/")
    }
    res.sendFile(path.join(__dirname,"..","..","public","successpwd.html"))
}

function changeOldPass(req, res){
    const{oldpassword, password} = req.body
    
    const username = req.user[0].username

    db.query(`select * from users where username='${username}' and password='${oldpassword}'`,(err,data)=>{
        if(err){
            throw err
        }
        if(data.length == 0){
            return res.redirect("/change/nomatched")
        }
        db.query(`update users set password='${password}' where  username='${username}'`,(err,data)=>{
            if(err){
                throw err
            }

            res.redirect("/change/matched")
        })
    })
}

function matchedPwd(req,res){
    if(!req.user){
        res.redirect("/")
    }
    res.sendFile(path.join(__dirname,"..","..","public","pwdmatch.html"))
}

function notmatchedPwd(req,res){
    if(!req.user){
        res.redirect("/")
    }
    res.sendFile(path.join(__dirname,"..","..","public","pwdnotmatch.html"))
}

module.exports = {
    getChangepwd,
    postChangepwd,
    tryAgain,
    successPwd,
    changeOldPass,
    matchedPwd,
    notmatchedPwd
}