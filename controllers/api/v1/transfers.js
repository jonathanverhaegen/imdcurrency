
const Transfer = require('../../../models/transfers');


const getAll = (req,res) => {
    Transfer.find((err,doc) => {
        if(err){
            res.json({
                "status": "error",
                "message": "there was an error while getting the transfers"
            })
        }

        if(!err){
            res.json({
                "status": "succes",
                "data": {
                    "transfers": doc
                }
            })
        }
    });
    

}

const save = (req,res) => {
    
    let senderId = req.body.senderId;
    let recieverId = req.body.recieverId;
    let amount = req.body.amount;
    let reason = req.body.reason;
    let text = req.body.text;

    const transfer = new Transfer
    ({senderId: senderId, recieverId: recieverId, amount: amount, reason: reason, text: text});

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
    
    
};

const getById = (req,res) => {

    let id = req.params.id;

    Transfer.find({"_id": id}, (err,doc)=>{
        if(err){
            res.json({
                "status": "error",
                "message": `there was an error while getting the transfer with id: ${id}`
            })
        }
        if(!err){
            res.json({
                "status": "succes",
                "transfer": doc
            })
        }
    })

    
};

module.exports.getAll = getAll;
module.exports.save = save;
module.exports.getById = getById;