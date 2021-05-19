const User = require("../../../models/users");

const getUser = (req, res) => {
    
    //getting the user id of the loged in user
    let userId = req.user._id;
    
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
                "id": userId,
                "firstname": docs.firstname,
                "lastname": docs.lastname,
                "amount": docs.coins
                
            })
        }
    })


}

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

module.exports.getUser = getUser;
module.exports.getUserById = getUserById;
