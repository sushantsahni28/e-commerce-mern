const express = require('express')
const cors = require('cors')
const path = require('path')
const passport = require('passport')

const { signupRouter } = require('./controllers/signup/signup.router')
const { loginRouter } = require('./controllers/login/login.router')
const { productRouter } = require('./controllers/product/product.router')
const { verifyRouter } = require('./Email verfications/verification/verification.router')
const { changeRouter } = require('./controllers/forgot/forgot.router')
const { adminRouter } = require('./controllers/admin/admin.router')

const app = express()

app.use(cors())
app.use(express.static("public"))
app.use(express.static("uploads"))
app.use(express.urlencoded({extended: true}))       //extract form data
app.use(express.json())

require("./strategies/local")(passport)
app.use(passport.initialize());
app.set("view engine","ejs")
//app.use("views",__dirname+"/abc")

app.use("/api/signup",signupRouter)
app.use("/api/login",loginRouter)
app.use("/api/products",productRouter)
app.use("/api/verification", verifyRouter)
app.use("/api/change",changeRouter)
app.use("/api/admin",adminRouter)

app.get("/", (req, res) => {
    var Pname = ""
    if(req.user){
        Pname = req.user[0].name
    }
    res.render("home",{Pname})
})
app.get("/api/pending",(req,res) =>{
    if(req.user && req.user[0].verified == 0){
        return res.sendFile(path.join(__dirname,"public", "pending.html"))
    }
    res.redirect('/')
})
app.get("/api/invalidtoken",(req,res) =>{
    res.sendFile(path.join(__dirname,"public", "invalid.html"))  
})
app.get("/sent", (req, res) => {
    if(req.user){
        res.redirect("/")
    }
    res.sendFile(path.join(__dirname,"public","sent.html"))
})

module.exports = app