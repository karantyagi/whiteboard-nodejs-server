var express = require('express')
var app = express()

app.get('/', function (req, res) {
    res.send('Hello World from express server !')
})

app.listen(4000);