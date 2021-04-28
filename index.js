const express = require('express')
const app = express()
const port = 3000
const logger = require('./middleware/logger')
const apiV1TranfsersRouter = require('./routers/api/v1/transfers')

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/v1/transfers', apiV1TranfsersRouter);



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})