const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')

const pathToKey = path.join(__dirname,'id_rsa_priv.pem')
const PRIV_KEY = fs.readFileSync(pathToKey,'utf-8')

function issueJWT(user){
    const username = user.username
    
    const expiresIn = '1d'
    const payload = {
        sub: username,
        iat: Date.now()
    }

    const signedToken = jwt.sign(payload, PRIV_KEY, {expiresIn: expiresIn, algorithm: 'RS256'})

    return{
        token: "Bearer "+ signedToken,
        expires: expiresIn
    }
}

module.exports.issueJWT = issueJWT