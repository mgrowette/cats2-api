require('dotenv').config()
const { propOr } = require('ramda')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = propOr(9999, 'PORT', process.env)

app.get('/', (req, res) =>
  res.send(`<h1> Welcome to the world of cool cats!</h1>`)
)

app.listen(port, () => console.log('CATS up and running on port', port))
