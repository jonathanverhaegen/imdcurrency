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
    
    
    
    
};

const getById = (req,res) => {

    let id = req.params.id;

    Transfer.find({"_id": id}, (err,doc)=>{
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