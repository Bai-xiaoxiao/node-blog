
var express = require('express');
var index = express.Router();
index.get('/', function(req, res){
    res.render('index');
});

module.exports = function(app){
    app.use('/index', index);
    app.use('/home', require('./home'));
    app.use('/articel', require('./articel'));
    app.use('/sign', require('./sign'));
    app.use('/personal', require('./personal'));
    app.use('/err', require('./err'));
}