const getAll = (req,res) => {
    
    res.json({
        "status": "succes",
    })

}

const save = (req,res) => {
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