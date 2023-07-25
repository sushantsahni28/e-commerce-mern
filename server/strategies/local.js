const db = require('../models/sql.model')
const fs = require('fs')
const path = require('path')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const pathToKey = path.join(__dirname,'..','utility','id_rsa_pub.pem')
const PUB_KEY = fs.readFileSync(pathToKey,'utf-8')

const options={
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_KEY,
    algorithms: ['RS256']
}

const Strategy = new JwtStrategy(options,(payload,done) => {
    db.query(`select * from users where username='${payload.sub}'`,(err,data)=> {
        if(err){
            done(err,null)
        }

        if(data.length != 0){
            const user = {...data[0]}
            delete user.password
            delete user.token

            done(null,user)
        }else{
            done(null,false)
        }
    })
})

module.exports = (passport) => {
    passport.use(Strategy)
}
