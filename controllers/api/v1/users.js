const User = require("../../../models/users");



const getUserById =  (req, res) =>{
    let userId = req.params.id;

    
    User.findById(userId, {useFindAndModify: false}, (err, docs)=>{
        if(err){
            res.json({
                "status": "error",
                "message": err
            })
        }
        if(!err){
            res.json({
                "status": "success",
                "user": docs
            })
        }
    })
    
}

module.exports.getUserById = getUserById;
