const Primus = require('primus');

let go = (server) => {
    let primus = new Primus(server, {/* options */});

    primus.on('connection', (spark) => {
        // spark is the new connection.
        console.log("we have a spark");

        spark.on('data', (data) =>{
            console.log(data);
            primus.write(data);
        });
  

      });

      
}

module.exports.go = go;
