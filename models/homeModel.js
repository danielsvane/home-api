// models/userModel.js
const mongoose = require('../database')
const schema = {
  description: { type: mongoose.SchemaTypes.String, required: true }
}
const collectionName = 'homes' // Name of the collection of documents
const userSchema = mongoose.Schema(schema)
const Homes = mongoose.model(collectionName, userSchema)
module.exports = Homes
