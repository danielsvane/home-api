const mongoose = require('mongoose')

const dbPath = 'mongodb+srv://danielsvane:VuN8XzHUqmCbeh@cluster0-ulrec.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(dbPath, {
  useNewUrlParser: true
})
const db = mongoose.connection
db.on('error', () => {
  console.log('> error occurred from the database')
})
db.once('open', () => {
  console.log('> successfully opened the database')
})
module.exports = mongoose
