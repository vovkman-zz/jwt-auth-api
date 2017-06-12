/**
 * Created by liamvovk on 2017-06-09.
 */

module.exports.user = {
  name: 'Test User1',
  email: 'test1@test.com',
  type: 'employer',
  password: 'InSwagWeTrustHomez'
}
module.exports.newUser = {
  name: 'New User',
  email: 'newUser@test.com',
  type: 'employer',
  password: 'InSwagWeTrustHomez'
}
module.exports.noName = {
  email: 'test@test.com',
  type: 'employer',
  password: 'InSwagWeTrustHomez'
}
module.exports.noEmail = {
  name: 'Test User',
  type: 'employer',
  password: 'InSwagWeTrustHomez'
}
module.exports.noPassword = {
  name: 'Test User',
  email: 'test@test.com',
  type: 'employer'
}
module.exports.noType = {
  name: 'Test User',
  email: 'test@test.com',
  password: 'InSwagWeTrustHomez'
}
module.exports.invalidType = {
  name: 'Test User',
  email: 'test@test.com',
  type: 'swaggerJack',
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
    name: 'Test User1',
    email: 'test1@test.com',
    type: 'employer',
    password: '$2a$07$UuE3NjkJ1WHDZdQT90xav.1yma7leFTHWCPpIvSegFgqVoUIeaTe.'
  },
  {
    name: 'Test User2',
    email: 'test2@test.com',
    type: 'worker',
    password: '$2a$07$UuE3NjkJ1WHDZdQT90xav.1yma7leFTHWCPpIvSegFgqVoUIeaTe.'
  },
  {
    name: 'Test User3',
    email: 'test3@test.com',
    type: 'employer',
    password: '$2a$07$UuE3NjkJ1WHDZdQT90xav.1yma7leFTHWCPpIvSegFgqVoUIeaTe.'
  }
]
