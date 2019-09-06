// 文章模块
var express = require('express');
var router = express.Router();
var articel = require('../lib/articel')

router.get('/list', function (req, res) {
    // 单独调的接口拿不到req.session
    // find不传第二个参数就返回所有字段
    articel.find({
        authorId: req.query.authorId
    }, function (data) {
        res.json({
            count: data.length,
            list: data
        })
    })

});

router.get('/detail/:id', function (req, res) {
    // 可以用req.params.id 获取/detail/888的参数
    res.set('Content-Type', 'text/plain');
    res.end(`我是${req.params.id}的内容详情`);
});

router.post('/publish', function (req, res) {
    // 保存作者信息
    req.body.authorId = req.session._id;
    req.body.authorName = req.session.userName;
    articel.add(req.body, function (data) {
        res.end('success');
    });
});

module.exports = router;