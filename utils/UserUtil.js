/**
 * Created by liamvovk on 2017-06-09.
 */

let uuid = require('uuid/v4')
let jwt = require('')

let User = require('../db/models/user')

class UserUtil {
  login (user) {
    return user
  }
  generateToken (user) {
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
  register (user) {
    let newUser = new User(user)
    return newUser.save()
  }
  updatePassword (user) {
    return User.findOne({'_id': user._id})
      .then(updatedUser => {
        updatedUser.password_digest = user.password
        return updatedUser.save()
      })
      .catch(err => {
        return err
      })
  }
  updateEmail (user) {
    return User.findOne({'_id': user._id})
      .then(updatedUser => {
        updatedUser.email = user.email
        return updatedUser.save()
      })
      .catch(err => {
        return err
      })
  }
}

module.exports = () => { return new UserUtil() }