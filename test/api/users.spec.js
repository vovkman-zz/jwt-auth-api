/**
 * Created by liamvovk on 2017-06-09.
 */

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const chaiHttp = require('chai-http')
chai.use(chaiAsPromised)
chai.use(chaiHttp)
let should = chai.should()

let connectionString = require('../../db/config/connection_string')
let mongo = require('mongodb').MongoClient
let db = mongo.connect(connectionString)
let app = require('../../app')
let userFixtures = require('../fixtures/models/users')

describe('users collection api endpoints', () => {
  before(function * () {
    db = yield db
    yield db.collection('users').insertMany(userFixtures.testCollection)
  })
  after(function * () {
    yield db.collection('users').drop()
  })
  describe('/POST login', () => {
    it('should login a user who already has an account')
  })
})
