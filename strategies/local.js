const passport = require('passport')
const LocalStrategy = require('passport-local')
const db = require('../models/sql.model')

passport.serializeUser(function(user, done) {
    done(null, user.username);
})

passport.deserializeUser(function(username, done) {
    db.query(`select * from users where username='${username}'`,(err,data) => {
            if(err){
                done(null,err)
            }
            delete data.password
            done(null, data)
        })
})

passport.use(new LocalStrategy(
    (username, password, done) => {
        db.query(`select * from users where username='${username}'`,(err,data) => {
            if(err){
                done(err, null)
            }
            const result = data[0]

            if(result && result.password == password){
                done(null, result)
            }else{
                done(null, false)
            }
        })
    }
))

module.exports = passport