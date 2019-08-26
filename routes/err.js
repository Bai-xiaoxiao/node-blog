var express = require('express');
var router = express.Router();

router.get('/', function(req,res){
    res.render('err', {
        msg: req.query.msg
    })
})

module.exports = router;