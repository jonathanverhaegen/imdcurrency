
const express = require('express')
const app = express()
const port = 3000

app.get('/api/currency', (req, res) => {
  res.send('get the currency');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
