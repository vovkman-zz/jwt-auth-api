/**
 * Created by liamvovk on 2017-06-09.
 */

module.exports.user = {
  email: 'test1@test.com',
  password: 'InSwagWeTrustHomez'
}
module.exports.newUser = {
  email: 'newUser@test.com',
  password: 'InSwagWeTrustHomez'
}
module.exports.noName = {
  email: 'test@test.com',
  password: 'InSwagWeTrustHomez'
}
module.exports.noEmail = {
  password: 'InSwagWeTrustHomez'
}
module.exports.noPassword = {
  email: 'test@test.com'
}
module.exports.noType = {
  email: 'test@test.com',
  password: 'InSwagWeTrustHomez'
}
module.exports.invalidEmail = {
  email: 'test_test.com',
  password: 'InSwagWeTrustHomez'
}
module.exports.invalidType = {
  email: 'test@test.com',
  password: 'InSwagWeTrustHomez'
}
module.exports.invalidPassword = {
  email: 'test1@test.com',
  password: 'InSwagWeDontTrust'
}
module.exports.notInCollection = {
  email: 'notfound@test.com',
  password: 'InSwagTrust'
}
module.exports.testCollection = [
  {
    email: 'test1@test.com',
    password: '$2a$07$UuE3NjkJ1WHDZdQT90xav.1yma7leFTHWCPpIvSegFgqVoUIeaTe.'
  },
  {
    email: 'test2@test.com',
    password: '$2a$07$UuE3NjkJ1WHDZdQT90xav.1yma7leFTHWCPpIvSegFgqVoUIeaTe.'
  },
  {
    email: 'test3@test.com',
    password: '$2a$07$UuE3NjkJ1WHDZdQT90xav.1yma7leFTHWCPpIvSegFgqVoUIeaTe.'
  }
]
