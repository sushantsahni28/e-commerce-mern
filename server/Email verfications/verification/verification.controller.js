const db = require('../../models/sql.model')

function verifyEmailToken(req, res){
    const { token } = req.body
    
    db.query(`select * from users where token='${token}'`, (err,data) =>{
        if(err){
            return res.status(500).send("Something went wrong. Try again later.")
        }
        if(data.length == 0){
            return res.status(404).send('Invalid Token.')
        }

        db.query(`update users set token='' ,verified=1 where token='${token}'`,(err,data) => {
            if(err){
                return res.status(500).send("Something went wrong. Try again later.")
            }

            res.status(200).send({ok : true})
        })
    })
}


module.exports = {
    verifyEmailToken
}