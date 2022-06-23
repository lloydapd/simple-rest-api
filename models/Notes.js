const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
  title:                { type: String, required: true },
  description:          { type: String, required: true },
  dateAdded:            { type: Date, required: true, default: Date.now }
})

module.exports = mongoose.model('Notes', noteSchema)