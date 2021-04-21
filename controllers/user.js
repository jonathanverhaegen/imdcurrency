const User = require("../models/user");

function post(req,res){
    let name = req.params.name;

    if(name != null){
        let user = new User();
        user.username = name;

        user.save((err,doc) => {

            if(!err){
                res.json({
                    "status": "succes",
                    "data":{
                    "message": doc
                    }
             })
        }
     });
        
    }
}

module.exports.post = post

