/**
 * Created by liamvovk on 2017-06-09.
 */

let bcrypt = require('bcrypt')
let uuid = require('uuid/v4')
let jwt = require('jsonwebtoken')

let User = require('../db/models/user')

class UserUtil {
  login (user) {
    let password = user.password
    return User.findOne({'_id': user._id})
      .then(curUser => {
        let password_digest = curUser.password
        return new Promise((resolve, reject) => {
          bcrypt.compare(password, password_digest, (err, res) => {
            if (err) reject(err)
            else resolve(generateToken(curUser))
          })
        })
      })
  }
  signup (user) {
    return digest(user.password)
      .then(password_digest => {
        user.password = password_digest
        let newUser = new User(user)
        return newUser.save()
          .then(() => {
            return generateToken(user)
          })
      })
  }
  updatePassword (user) {
    return User.findOne({'_id': user._id})
      .then(updatedUser => {
        digest(user.password)
          .then(password_digest => {
            user.password = password_digest
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
      else resolve(token)
    })
  })
}

module.exports = () => { return new UserUtil() }