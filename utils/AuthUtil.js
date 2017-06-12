/**
 * Created by liamvovk on 2017-06-09.
 */

let Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt'))
let uuid = require('uuid/v4')
let jwt = require('jsonwebtoken')

let User = require('../db/models/user')

class AuthUtil {
  login (user) {
    let password = user.password
    return User.findOne({'email': user.email})
      .then(curUser => {
        if (curUser === null) {
          let err = {
            error: 'You do not have an account. Please sign up'
          }
          return Promise.reject(err)
        }
        let passwordDigest = curUser.password
        return new Promise((resolve, reject) => {
          bcrypt.compare(password, passwordDigest, (err, res) => {
            if (!res || err) {
              let err = {
                error: 'The password you supplied was incorrect'
              }
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
        let newUser = new User(user)
        return newUser.save()
          .then((savedUser) => {
            return generateToken(savedUser)
          })
      })
  }
  updatePassword (user) {
    return User.findOne({'_id': user._id})
      .then(updatedUser => {
        digest(user.password)
          .then(passwordDigest => {
            user.password = passwordDigest
            return updatedUser.save()
          })
      })
  }
  updateEmail (user) {
    return User.findOne({'_id': user._id})
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

module.exports = () => { return new AuthUtil() }
