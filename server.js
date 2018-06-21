var express = require('express')
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/web-dev-db');
mongoose.connect('mongodb://admin:admin123@ds263460.mlab.com:63460/whiteboard-db');


var app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin",
        // "http://localhost:4200");
        "https://kt-whiteboard-angular-client.herokuapp.com");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var session = require('express-session')
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'any string'
}));


app.get('/', function (req, res) {
    res.send('node.js server for White-Board App !')
})


function setSession(req, res) {
    var name = req.params['name'];
    var value = req.params['value'];
    req.session[name] = value;
    res.send(req.session);
}

function getSession(req, res) {
    var name = req.params['name'];
    var value = req.session[name];
    res.send(value);
}


function getSessionAll(req, res) {
    res.send(req.session);
}

function resetSession(req, res) {
    res.session.destroy();
    res.send(200);
}



// Register several HTTP endpoints to test session

app.get('/api/session/set/:name/:value',
    setSession);
app.get('/api/session/get/:name',
    getSession);
app.get('/api/session/get',
    getSessionAll);
// app.get('/api/session/reset',
//     resetSession);


var sectionService = require('./services/section.service.server');
sectionService(app);

var userService = require('./services/user.service.server');
userService(app);


// Start the app by listening on the default Heroku port
app.listen(process.env.PORT);
// app.listen(4000);