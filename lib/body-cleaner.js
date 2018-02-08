const { pick } = require('ramda')

module.exports = requiredFields => cat => pick(requiredFields, cat)
