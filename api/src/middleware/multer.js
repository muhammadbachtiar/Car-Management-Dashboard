/* eslint-disable @typescript-eslint/no-var-requires */
const multer = require('multer')

const storage = multer.memoryStorage()

module.exports = multer({ storage })
