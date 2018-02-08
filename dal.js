require('dotenv').config()
const PouchDB = require('pouchdb-core')
PouchDB.plugin(require('pouchdb-adapter-http'))
PouchDB.plugin(require('pouchdb-find'))
const HTTPError = require('node-http-error')
const sluggo = require('slugify')
const db = new PouchDB(process.env.COUCHDB_URL)

const createDoc = function(doc, cb) {
  doc._id = `cats_${sluggo(doc.name)}`
  db.put(doc, cb)
}

const dal = { createDoc }

module.exports = dal
