/**
 * Created by Liam Vovk on 2017-06-08.
 */

let express = require('express')
let bodyParser = require('body-parser')
let app = express()

let db = require('./db/connect/connect')
let UserUtil = require('./utils/UserUtil')()

app.set('port', (process.env.port || 3000))

// app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// Additional middleware which will set headers that we need on each request.
app.use(function (req, res, next) {
  // Set permissive CORS header - this allows this server to be used only as
  // an API server in conjunction with something like webpack-dev-server.
  res.setHeader('Access-Control-Allow-Origin', '*')

  // Disable caching so we'll always get the latest comments.
  res.setHeader('Cache-Control', 'no-cache')
  next()
})

app.route('/login')
  .post((req, res) => {
    let credentials = req.body
    UserUtil.login(credentials)
      .then(token => {
        res.status(200).send(token)
      })
      .catch(err => {
        res.status(401).send(err)
      })
  })
app.route('/signup')
  .post((req, res) => {
    let user = req.body
    UserUtil.signup(user)
      .then(token => {
        res.status(201).send(token)
      })
      .catch(err => {
        err = {
          error: err.message,
          name: err.name,
          code: err.code,
        }
        res.status(400).send(err)
      })
  })

db.catch((err) => {
  console.log(err)
})

app.listen(app.get('port'), function () {
  console.log('Server started: http://localhost:' + app.get('port') + '/')
})

module.exports = app // Exporting for testing purposes


