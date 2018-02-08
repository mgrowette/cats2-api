require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const HTTPError = require('node-http-error')
const reqFieldChecker = require('./lib/check-required-fields')
const bodyCleaner = require('./lib/body-cleaner')

const { propOr, not, isEmpty, join } = require('ramda')

const { createDoc } = require('./dal')
const port = propOr(9999, 'PORT', process.env)

app.use(bodyParser.json())

app.get('/', (req, res) =>
  res.send(`<h1> Welcome to the world of cool cats!</h1>`)
)

const catRequiredFieldChecker = reqFieldChecker(['name', 'color'])

app.post('/cats', (req, res, next) => {
  // make the body cleaner function to pick out only the right props
  // create a path to check for the req.body, if not there, return error
  // pass the req.body through the body cleaner
  // send cleaned body to the dal en route to the database
  const missingFields = catRequiredFieldChecker(req.body)
  if (not(isEmpty(missingFields))) {
    next(
      new HTTPError(
        400,
        `Missing Fields: ${join(' ', catRequiredFieldChecker(req.body))} `
      )
    )
  }
  createDoc(req.body, function(err, createdResult) {
    if (err) {
      next(err.status, err.message, err)
      return
    }
    res.status(201).send(createdResult)
    return
  })
  return
})

app.use(function(err, req, res, next) {
  res.status(err.status || 500)
  res.send(err.message)
})
app.listen(port, () => console.log('CATS up and running on port', port))
