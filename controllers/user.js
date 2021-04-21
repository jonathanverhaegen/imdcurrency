

function post(req,res){
    let name = req.params.name;

    res.json({
        user: name,
        message: `made new user ${name}`
    })
}

module.exports.post = post

