const logger = (req,res,next) => {
    console.log("test");
    next();
}

module.exports = logger;