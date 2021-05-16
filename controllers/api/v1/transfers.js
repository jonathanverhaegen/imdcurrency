
const Transfer = require('../../../models/transfers');
const User = require('../../../models/users');


const getAll = (req,res) => {
    // Getting the userId
    let userId = req.user._id;
    console.log(userId);
    Transfer.find({$or:[{"senderId": userId},{"receiverId":userId}]}, {useFindAndModify: false}, (err, docs) => {
        if(err){
            res.json({
                "status": "error",
                "message": err
            })
        }

        if(!err){
            res.json({
                "status": "succes",
                "data": {
                    "transfers": docs
                }
            })
        }
    });
    

}

const save = async (req,res) => {
    // Getting receiverId by mail
    let receiverUsername = await User.find({username: req.body.receiverMail});
    // Getting id of logged in user
    let senderId = req.user._id;
    // Getting the id out of the object
    let receiverId = receiverUsername[0]._id;
    let amount = req.body.amount;
    let reason = req.body.reason;
    let text = req.body.text;

    const transfer = new Transfer
    ({senderId: senderId, receiverId: receiverId, amount: amount, reason: reason, text: text});

    let senderCoinsAmount = req.user.coins;
    let receiverCoinsAmount = receiverUsername[0].coins;

    // Check if sender has enough coins
    if(req.user.coins>=req.body.amount){
        // Subtract coins from sender
        updateCoinAmount(senderId, senderCoinsAmount-amount);
        // Add coins to receiver
        updateCoinAmount(receiverId, receiverCoinsAmount+amount);
        // Save transfer to database
        transfer.save( (err,doc) => {
            if(err){
                res.json({
                    "status": err,
                    "message": "there was an error while posting the transfer"
                })
            }

            if(!err){
                res.json({
                    "status": "succes",
                    "transfer": doc
                })
            }
        })
    }else{
        res.json({
            "status": "error",
            "message": "not enough coins"
        })
    }
    
    
};

const updateCoinAmount = (id, coinsAmount)=>{
    User.findByIdAndUpdate(id, {coins: coinsAmount}, {useFindAndModify: false}, (err, docs)=>{
    })
}

const getById = (req,res) => {

    let id = req.params.id;
    Transfer.findById(id, {useFindAndModify: false}, (err, docs)=>{
        if(err){
            res.json({
                "status": "error",
                "message": err
            })
        }
        if(!err){
            res.json({
                "status": "succes",
                "transfer": docs
            })
        }
    })

    
};

const leaderboard = (req, res) => {
    User.find((err, docs) => {
        if(err){
            res.json({
                "status": "error",
                "message": err
            })
        }
        if(!err){
            res.json({
                "status": "succes",
                "transfer": docs
            })
        }
    }).sort({coins: -1})
}

module.exports.getAll = getAll;
module.exports.save = save;
module.exports.getById = getById;
module.exports.leaderboard = leaderboard;