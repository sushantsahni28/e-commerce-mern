const express = require('express')
const session = require('express-session')
const fs = require('fs')
const path = require('path')
const passport = require('./strategies/local')

const { signupRouter } = require('./controllers/signup/signup.router')
const { loginRouter } = require('./controllers/login/login.router')
const { logout } = require('./controllers/login/login.controller')
const { userRouter } = require('./controllers/user/user.router')
const { productRouter } = require('./controllers/product/product.router')
const { verifyRouter } = require('./Email verfications/verification/verification.router')
const { changeRouter } = require('./controllers/forgot/forgot.router')
const { adminRouter } = require('./controllers/admin/admin.router')

const app = express()

app.use(express.static("public"))
app.use(express.static("uploads"))
app.use(express.urlencoded({extended: true}))       //extract form data
app.use(express.json())
app.set("view engine","ejs")
//app.use("views",__dirname+"/abc")

app.use(session({
  secret: 'keyboard cat',
  cookie: { maxAge: 60* 60 * 1000 },
  resave: false,
  saveUninitialized: false,     //if set to true it will sebd session id with cookie a client makes a request
}))

app.use(passport.initialize());
app.use(passport.session());

app.use("/signup",signupRouter)
app.use("/login",loginRouter)
app.get("/logout", logout)
app.use("/dashboard", userRouter)
app.use("/products",productRouter)
app.use("/verification", verifyRouter)
app.use("/change",changeRouter)
app.use("/admin",adminRouter)

app.get("/", (req, res) => {
    var Pname = ""
    if(req.user){
        Pname = req.user[0].name
    }
    res.render("home",{Pname})
})
app.get("/pending",(req,res) =>{
    if(req.user && req.user[0].verified == 0){
        return res.sendFile(path.join(__dirname,"public", "pending.html"))
    }
    res.redirect('/')
})
app.get("/invalidtoken",(req,res) =>{
    res.sendFile(path.join(__dirname,"public", "invalid.html"))  
})
app.get("/sent", (req, res) => {
    if(req.user){
        res.redirect("/")
    }
    res.sendFile(path.join(__dirname,"public","sent.html"))
})

module.exports = app