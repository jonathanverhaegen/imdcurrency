
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('hello world');
})

app.get('/api/currency', (req, res) => {
    res.json({
        from: "jonathan",
        to: "stijn",
        text: "hier is 5 imdcoin"
    })
  })

  app.get('/api/currency/:id', (req, res) => {
      let id= req.params.id;
    res.json({
        from: "jonathan",
        to: "stijn",
        text: `hier is 5 imdcoin with ${id}`
    })
  })

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
