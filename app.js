
const express = require('express')
const app = express()
const port = 3000
const routerCurrency = require('./routers/currency');
const routerUser = require('./routers/user');

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://jonathanverhaegen:7BU40fdgvRV@cluster0.ghtml.mongodb.net/imdcurrency?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

app.get('/', (req, res) => {
  res.send('hello world');
})


app.use("/api/currency",routerCurrency);

app.use("/api/user", routerUser);



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
