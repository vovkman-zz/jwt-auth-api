/**
 * Created by liamvovk on 2017-06-09.
 */
let User = require('../db/models/user')

class SignupUtil {
  register (user) {
    let newUser = new User(user)
    return newUser.save()
  }
}