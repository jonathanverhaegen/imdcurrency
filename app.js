
const express = require('express')
const app = express()
const port = 3000
const routerCurrency = require('./routers/currency');

app.get('/', (req, res) => {
  res.send('hello world');
})

app.use("/api/currency",routerCurrency);



  app.post("/api/user/:name",(req,res) => {
    let name = req.params.name;

    res.json({
        user: name,
        message: `made new user ${name}`
    })
  })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
