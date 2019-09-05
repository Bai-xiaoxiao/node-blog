var express = require('express');
var router = express.Router();
var user = require('../lib/user')

router.get('/', function(req, res) {
    res.render('signin', {
        name: '登录页面'
    });
});

router.post('/', function(req, res){
    // 查询用户表
    user.find(req.body, function(data){
        if(!data){
            res.redirect('/err?msg=账户名或密码错误');
            return;
        }
        // 保存session
        // 登录之后可以查询出整个用户信息存到session中
        // 其他地方要用的话可以直接从session中取，不用重复获取信息
        req.session.userName = data.userName;
        req.session._id = data._id;
        
        res.redirect('/home');
    });
    // if(req.body.userName === 'admin' && req.body.password == '123456'){
    //     // res.set('Content-Type', 'text/plain'); // 返回中文时，需要设置编码格式
    //     // res.status(200).end('登录成功');
    //     // 跳转到主页
    //     res.redirect('/home');
    // }else{
    //     // res.set('Content-Type', 'text/plain');
    //     res.redirect('/err?msg=账户名或密码错误');
    // }
});

// 注册页面
router.get('/signup', function(req, res){
    res.render('signup', {
        name: '注册页面'
    });
})

// 注册请求
router.post('/signup', function(req, res){
    if(!req.body.userName || !req.body.password){
        res.redirect('/err?msg=请传入账号名或密码');
        return;
    }
    user.add(req.body, function(){
        res.redirect('/sign');
    });
})

module.exports = router;