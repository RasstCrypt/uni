
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./rastv2sdk.cjs.production.min.js')
} else {
  module.exports = require('./rastv2sdk.cjs.development.js')
}
