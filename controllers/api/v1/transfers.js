
const Transfer = require('../../../models/transfers');
const User = require('../../../models/users');


const getAll = (req,res) => {
    // Getting the userId
    let userId = req.user._id;
    
    Transfer.find({$or:[{"senderId": userId},{"receiverId":userId}]}, {useFindAndModify: false}, {count:1, results:{ $slice: 5}}, (err, docs) => {
        if(err){
            res.json({
                "status": "error",
                "message": err
            })
        }

        if(!err){
            res.json({
                "status": "success",
                "data": {
                    "transfers": docs
                },
                "user": userId
            })
        }
    })
    

}

const save = async (req,res) => {
    // Getting receiverId by mail
    // let receiverUsername = await User.find({username: req.body.receiverMail});
    let receiverUsername = await User.find({firstname: req.body.firstname, lastname: req.body.lastname});
    // Getting id of logged in user
    let senderId = req.user._id;
    
    // Getting the id out of the object
    let receiverId = receiverUsername[0]._id;

    
    
    
    let amount = req.body.amount;
    let reason = req.body.reason;
    let text = req.body.text;

    if(senderId === receiverId){
        return res.json({
            "status": "error",
            "message": "Can't send coins to yourself, you greedy bastard!"
        })
    }else{

    

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
                    "status": "success",
                    "transfer": doc,
                    "user": receiverId
                    
                })
            }
        })
    }else{
       return res.json({
            "status": "error",
            "message": "Not enough coins"
        })
    }
    
} 

};

const updateCoinAmount = (id, coinsAmount)=>{
    if(coinsAmount > 999){
        coinsAmount = 999;
    }
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
                "status": "success",
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
                "status": "success",
                "transfer": docs
            })
        }
    }).sort({coins: -1})
};

const filterAmount = (req,res) => {

    

    Transfer.find({amount: {$gte:20} },(err, docs) => {
        if(err){
            res.json({
                "status": "error",
                "message": err
            })
        }

        if(!err){
            res.json({
                "status": "success",
                "transfers": docs
            })
        }
    });
};

const history = (req, res) => {
    Transfer.find((err, docs) => {
        res.json({
            'status': 'success',
            'transfers': docs
        })
    })
}

module.exports.getAll = getAll;
module.exports.save = save;
module.exports.getById = getById;
module.exports.leaderboard = leaderboard;
module.exports.filterAmount = filterAmount;
module.exports.history = history;