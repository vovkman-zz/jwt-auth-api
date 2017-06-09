/**
 * Created by Liam Vovk on 2017-06-08.
 */

let mongoose = require("mongoose")
let Promise = require("bluebird")
const bcrypt = Promise.promisifyAll(require("bcrypt"))
let Schema = mongoose.Schema

let userSchema = new Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    index: { unique: true },
    required: true,
    match: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
  },
  password_digest: {
    type: String,
    required: true,
    match: /(?=.*[a-zA-Z])(?=.*[0-9]+).*/,
    minlength: 12
  },
  type: { type: String, required: true, enum: ['worker', 'employer'] },
  created: { type: Date, required: true, default: new Date() }
})

userSchema.pre("save", next => {
  if (!this.isModified("password")) {
    return next();
  }
  bcrypt.hash(this.password, 16.5)
    .then( hash => {
      this.password_digest = hash;
      next();
    })
    .catch( err => {
      next(err)
    })
})

module.exports = mongoose.model('User', userSchema)