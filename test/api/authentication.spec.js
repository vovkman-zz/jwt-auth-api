/**
 * Created by liamvovk on 2017-06-09.
 */

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const chaiHttp = require('chai-http')
chai.use(chaiAsPromised)
chai.use(chaiHttp)
let should = chai.should()
let expect = chai.expect

let connectionString = require('../../db/config/connection_string')
let mongo = require('mongodb').MongoClient
let db = mongo.connect(connectionString)
let app = require('../../app')
let userFixtures = require('../fixtures/models/users')
const Errors = require('../../constants/errors')

describe('users collection api endpoints', () => {
  before(function * () {
    db = yield db
    yield db.collection('credentials').insertMany(userFixtures.testCollection)
  })
  after(function * () {
    yield db.collection('credentials').drop()
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
          expect(res.body).to.deep.equal(Errors.NO_ACCOUNT)
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
          expect(res.body).to.deep.equal(Errors.INCORRECT_PASSWORD)
          done()
        })
    })
  })
  describe('/POST signup', () => {
    it('should signup a new user', done => {
      let testUser = userFixtures.newUser
      chai.request(app)
        .post('/signup')
        .send(testUser)
        .end((err, res) => {
          res.should.have.status(201)
          res.body.should.have.property('token')
          done()
        })
    })
    it('should not signup a user who already has an account', done => {
      let testUser = userFixtures.user
      chai.request(app)
        .post('/signup')
        .send(testUser)
        .end((err, res) => {
          res.should.have.status(400)
          res.body.should.have.property('error')
          done()
        })
    })
    it('should not signup a user who didnt supply their email', done => {
      let testUser = userFixtures.noEmail
      chai.request(app)
        .post('/signup')
        .send(testUser)
        .end((err, res) => {
          res.should.have.status(400)
          res.body.should.have.property('error')
          done()
        })
    })
    it('should not signup a user with an invalid email', done => {
      let testUser = userFixtures.invalidEmail
      chai.request(app)
        .post('/signup')
        .send(testUser)
        .end((err, res) => {
          res.should.have.status(400)
          res.body.should.have.property('error')
          done()
        })
    })
  })
})
