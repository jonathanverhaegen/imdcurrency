const express = require('express')
const app = express()
const port = 3000
const logger = require('./middleware/logger')

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// GET api/v1/transfers

app.get('/api/v1/transfers', logger, (req,res) => {
    res.send("get transfers");
})


//POST api/v1/transfers
app.post('/api/v1/transfers', (req,res) => {
    res.send("post transfers");
})

// GET api/v1/transfers/:id
app.get('/api/v1/transfers/:id', (req,res) => {
    res.send("get transfers by id " + req.params.id);
})

// GET api/v1/leaderboard

app.get('/api/v1/leaderboard', (req,res) => {
    res.send("get leaderboard");
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})