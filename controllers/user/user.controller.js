function dashboard(req, res){

    if(!req.user){
        return res.redirect("/")
    }
    if(req.user && req.user[0].verified == "0"){
        return res.redirect("/pending")
    }

    const user = req.user[0]
    res.render("dashboard",{user})
}

module.exports = {
    dashboard
}