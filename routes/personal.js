var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.render('personal',{
        userName: req.session.userName
    });
});

module.exports = router;