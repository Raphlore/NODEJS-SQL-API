require('dotenv').config({path: `${process.cwd()}/.env` })
const express = require('express')
const bodyParser = require('body-parser')
const appRoutes = require('./routes')


const app = express()
app.use(bodyParser.json())

app.use('/', appRoutes)

const PORT = process.env.APP_PORT || 4000

app.listen(PORT, () => {
  console.log('Server up and running', PORT)
})