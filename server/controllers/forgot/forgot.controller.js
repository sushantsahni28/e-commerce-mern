const db = require('../../models/sql.model')

function changePwd(req, res){
    const { password,token } = req.body
    
    db.query(`update users set password='${password}',token='' where token='${token}'`,(err,data) =>{
        if(err){
            return res.status(500).send("Something went wrong. Try again later")
        }
    
        if(data.changedRows == 1){
            return res.status(200).send({ok : true})
        }
        return res.status(404).send("Token is not valid")
    })    
}


function changeOldPass(req, res){
    const {oldpassword, password} = req.body
    
    const username = req.user.username

    db.query(`select * from users where username='${username}' and password='${oldpassword}'`,(err,data)=>{
        if(err){
            return res.status(500).send("Something went wrong. Try again later.")
        }
        if(data.length == 0){
            return res.status(404).send("Wrong old Password")
        }
        db.query(`update users set password='${password}' where  username='${username}'`,(err,data)=>{
            if(err){
                return res.status(500).send("Something went wrong. Try again later.")
            }

            return res.status(200).send({ok : true})
        })
    })
}


module.exports = {
    changePwd,
    changeOldPass,
}