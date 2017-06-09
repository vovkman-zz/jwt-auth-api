/**
 * Created by liamvovk on 2017-06-09.
 */

module.exports.user = {
  name: 'Test User',
  email: 'test@test.com',
  type: 'employer',
  password: '12345'
}
module.exports.noName = {
  email: 'test@test.com',
  type: 'employer',
  password: '12345'
}
module.exports.noEmail = {
  name: 'Test User',
  type: 'employer',
  password: '12345'
}
module.exports.noPassword = {
  name: 'Test User',
  email: 'test@test.com',
  type: 'employer',
}
module.exports.noType = {
  name: 'Test User',
  email: 'test@test.com',
  type: 'employer',
  password: '12345'
}
module.exports.invalidType = {
  name: 'Test User',
  email: 'test@test.com',
  type: 'swaggerJack',
  password: '12345'
}
module.exports.testCollection = [
  {
    name: 'Test User1',
    email: 'test1@test.com',
    type: 'employer',
    password: '12345'
  },
  {
    name: 'Test User2',
    email: 'test2@test.com',
    type: 'worker',
    password: '12345'
  },
  {
    name: 'Test User3',
    email: 'test3@test.com',
    type: 'employer',
    password: '12345'
  }
]