const User = require("../../../models/users");
const passport = require('../../../passport/passport');
var jwt = require('jsonwebtoken');

const signup = async (req,res,next) => {

    console.log(req.body);
    
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let username = req.body.username;
    let password = req.body.password;
    let coins = 50;

    let endEmail = username.split("@");

    if(endEmail[1] === "student.thomasmore.be"){
        const user = new User({firstname: firstname, lastname: lastname, username: username, coins: coins});
            await user.setPassword(password);
            await user.save().then(result =>{

            let token = jwt.sign({
                uid: result._id,
                email: result.username
            },'MyVerySecretWord');
        
            res.json({
                "status": "success",
                "data": {
                    "token": token
                }
            })
        }).catch(error => {
            res.json({
                "status": "error",
                "message": error
            })
        })
    }else{
        res.json({
            "status": "error",
            "message": "Please register with a @student.thomasmore email"
        })
    }

    
}

const login = async (req,res,next) =>{
    const user  = await User.authenticate()(req.body.username, req.body.password).then(result => {

        console.log(result.user);

        if(!result.user){
            return res.json({
                "status": "failed",
                "message": "login failed"
            })
        }

        let token = jwt.sign({
            uid: result.user._id,
            email: result.user.username
        },'MyVerySecretWord');

        return res.json({
            "status": "success",
            "data": {
                "token": token
            }
        })
    }).catch(error =>{
        res.json({
            "status": "error",
            "message": error
        })
    });
}

module.exports.signup = signup;
module.exports.login = login;