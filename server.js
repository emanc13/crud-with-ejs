var express = require('express')
var app = express()
var bodyParser= require('body-parser')
var MongoClient = require('mongodb').MongoClient

var db

MongoClient.connect('mongodb://eman:malware1@ds053196.mlab.com:53196/malwaredb', (err, client) => {
    if (err) return console.log(err)
    db = client.db('malwaredb') //assign databaseb to db  object
    app.listen(3000, () => {
      console.log('started listening on 3000')
  })
})

//CRUD handlers

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
    db.collection('data').find().toArray(function(err, result) {
        console.log(result)
            // renders index.ejs
    res.render('index.ejs', {define: result})
  })
})

/* Post to /homepage
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
})*/

app.post('/data', (req, res) => {
  db.collection('data').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})

app.put('/data', (req, res) => {
  db.collection('data')
  .findOneAndUpdate({name: 'virus'}, {
    $set: {
      name: req.body.name,
      data: req.body.define
    }

  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete('/data', (req, res) => {
  db.collection('data').findOneAndDelete({name: req.body.name},
    (err, result) => {
      if (err) return res.send(500, err)
      res.send({message: 'A definition was deleted'})
    })
})