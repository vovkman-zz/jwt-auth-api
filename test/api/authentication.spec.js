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
    it('should login a user who already has an account', done => {
      let testUser = userFixtures.user
      chai.request(app)
        .post('/login')
        .send(testUser)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.have.property('token')
          done()
        })
    })
    it('should not login a user who does not have an account', done => {
      let testUser = userFixtures.notInCollection
      chai.request(app)
        .post('/login')
        .send(testUser)
        .end((err, res) => {
          res.should.have.status(401)
          res.body.should.have.property('error')
          done()
        })
    })
    it('should not login a user who didnt supply the correct password', done => {
      let testUser = userFixtures.invalidPassword
      chai.request(app)
        .post('/login')
        .send(testUser)
        .end((err, res) => {
          res.should.have.status(401)
          res.body.should.have.property('error')
          done()
        })
    })
  })
  describe('/POST signup', () => {
    it('should signup a new user', done => {

    })
    it('should not signup a user who already has an account', done => {

    })
    it('should not signup a user who didnt supply their name', done => {

    })
    it('should not signup a user who didnt supply their email', done => {

    })
  })
})
