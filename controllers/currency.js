
function getAll(req,res){
    res.json({
        from: "jonathan",
        to: "stijn",
        text: "hier is 5 imdcoin"
    })
}

function getOneById(req,res){
    let id= req.params.id;
    res.json({
        from: "jonathan",
        to: "stijn",
        text: `hier is 5 imdcoin with ${id}`
    })
}

module.exports.getAll = getAll;
module.exports.getOneById = getOneById;