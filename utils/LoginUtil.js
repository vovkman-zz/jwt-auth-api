/**
 * Created by liamvovk on 2017-06-09.
 */
let uuid = require('uuid/v4')

class LoginUtil {
  login (user) {

  }
  generateToken (user) {
    let claims = {
      _id: user._id,
      name: user.name,
      type: user.type,
      jti: uuid()
    }

  }
  updatePassword () {

  }
  updateEmail () {

  }
}

module.exports = () => { return new LoginUtil() }