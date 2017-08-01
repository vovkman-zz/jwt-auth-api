/**
 * Created by Liam Vovk on 2017-06-08.
 */

let mongoose = require('mongoose')
let Schema = mongoose.Schema

let credentialSchema = new Schema({
  email: {
    type: String,
    index: { unique: true },
    required: true,
    match: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
  },
  password: {
    type: String,
    required: true
  },
  created: { type: Date, required: true, default: new Date() },
  type: { type: String, required: true, enum: ['worker', 'employer']}
})

module.exports = mongoose.model('Credential', credentialSchema)
