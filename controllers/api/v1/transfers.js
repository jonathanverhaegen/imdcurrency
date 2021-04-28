const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transferSchema = new Schema({
      senderId: String,
      recieverId: String,
      text: String,
      amount: String
});

const Transfer = mongoose.model('transfer', transferSchema);




const getAll = (req,res) => {
    Transfer.find((err,doc) => {
        if(!err){
            res.json({
                "status": "succes",
                "data": {
                    "transfer": doc
                }
            })
        }
    });
    

}

const save = (req,res) => {

    let transfer = new Transfer();
    transfer.senderId = "1";
    transfer.recieverId = "2";
    transfer.text = "test voor transfer";
    transfer.amount = "5 imd coins";

    transfer.save( (err,doc) => {
        if(!err){
            res.json({
                "status": "succes",
                "transfer": doc
            })
        }
    })
    
    
    
    res.json({
        "status": "succes",
        "transfer":{
            "amount": "amount of coins",
            "reciever": "name"
        }
    })
};

const getById = (req,res) => {

    let id = req.params.id;
    res.json({
        "status": "succes",
        "id": id
    })
};

module.exports.getAll = getAll;
module.exports.save = save;
module.exports.getById = getById;