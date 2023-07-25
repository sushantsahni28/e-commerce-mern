const nanoid = require('nanoid')
const utils = require('../../utility/utils')
const verifyEmail = require('../../Email verfications/signup.sendmail')
const db = require('../../models/sql.model')

function postSignup(req,res){
        const {name, email, password, phone, gender} = req.body
        if(name == "" || email == "" || password == "" || phone == ""
            || gender == "" ){
            return res.status(400).send("All fields should contain data")            
        }
        
        const shortcode = nanoid()
        
        const insert = "insert into users (name,username,password,contact,gender,token) values(?)"
        const values = [
            name,
            email,
            password.checkPassword,
            phone,
            gender,
            shortcode
        ]

        db.query(insert, [values], (err,data)=>{
            if(err){
                if(err?.errno == 1062){
                    return res.status(400).send("Email already exists")
                }
                return res.status(400).send("Something went wrong. Try Again later.")
            }
            verifyEmail(email, name, shortcode)

            const user = {
                name,
                username: email,
                contact:phone,
                gender,
                verified:"0"
            }
            
            const jwt = utils.issueJWT(user)
            res.status(201).send({ok : true, user:user,token:jwt.token,expiresIn: jwt.expires})
        })
}

module.exports = {
    postSignup,
}