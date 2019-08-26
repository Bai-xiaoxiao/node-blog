var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('login', {
        name: '登录页面'
    });
});

router.post('/', function(req, res){
    if(req.body.userName === 'admin' && req.body.password == '123456'){
        res.set('Content-Type', 'text/plain'); // 返回中文时，需要设置编码格式
        res.status(200).end('登录成功');
        // 跳转到主页
        // ...
    }else{
        // res.set('Content-Type', 'text/plain');
        res.redirect('/err?msg=账户名或密码错误');
    }
});

module.exports = router;