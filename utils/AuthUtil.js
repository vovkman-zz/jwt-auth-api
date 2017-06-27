/**
 * Created by liamvovk on 2017-06-09.
 */

let Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt'))
let uuid = require('uuid/v4')
let jwt = require('jsonwebtoken')

let Credential = require('../db/models/credential')
const Errors = require('../constants/errors')

class AuthUtil {
  login (user) {
    let password = user.password
    return userExists({'email': user.email})
      .then(curUser => {
        let passwordDigest = curUser.password
        return new Promise((resolve, reject) => {
          bcrypt.compare(password, passwordDigest, (err, res) => {
            if (!res || err) {
              const err = Errors.INCORRECT_PASSWORD
              reject(err)
            } else resolve(generateToken(curUser))
          })
        })
      })
  }
  signup (user) {
    return digest(user.password)
      .then(passwordDigest => {
        user.password = passwordDigest
        let newUser = new Credential(user)
        return newUser.save()
          .then((savedUser) => {
            return generateToken(savedUser)
          })
      })
      .catch(err => {
        if (err.message) {
          err = {
            error: err.message,
            name: err.name,
            code: err.code
          }
        }
        return Promise.reject(err)
      })
  }
  updatePassword (user) {
    return userExists({'_id': user._id})
      .then(updatedUser => {
        digest(user.password)
          .then(passwordDigest => {
            user.password = passwordDigest
            return updatedUser.save()
          })
      })
  }
  updateEmail (user) {
    return userExists({'_id': user._id})
      .then(updatedUser => {
        updatedUser.email = user.email
        return updatedUser.save()
      })
  }
}

let digest = (password) => {
  return bcrypt.hash(password, 7)
}

let generateToken = (user) => {
  let claims = {
    _id: user._id,
    name: user.name,
    type: user.type,
    jti: uuid()
  }
  return new Promise((resolve, reject) => {
    jwt.sign(claims, process.env.JWT_SECRET, (err, token) => {
      if (err) reject(err)
      else resolve({ token: token })
    })
  })
}

let userExists = (user) => {
  return Credential.findOne(user)
    .then(curUser => {
      if (curUser === null) {
        const err = Errors.NO_ACCOUNT
        return Promise.reject(err)
      }
      else return curUser
    })
}
module.exports = () => { return new AuthUtil() }
