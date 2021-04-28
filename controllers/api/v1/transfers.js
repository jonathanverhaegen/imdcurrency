


const getAll = (req,res) => {
    
        res.send("get transfers");
   
}

const save = (req,res) => {
    res.send("post transfers");
};

const getById = (req,res) => {
    res.send("get transfers by id " + req.params.id);
};

module.exports.getAll = getAll;
module.exports.save = save;
module.exports.getById = getById;