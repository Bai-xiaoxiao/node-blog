var express = require('express');
var router = express.Router();
var http = require("http");

router.get('/', function (req, res) {
    // 在home页去调用articel的list接口
    http.get('http://localhost:8888/articel/list?pageSize=20', function (req2, res2) {
        var jsonData = '';
        req2.on('data', function (data) {
            // 每次请求到的Buffer加进去
            jsonData += data;
        });
        req2.on('end', function () {
            // 请求结束拿到所有数据，不过是字符串类型的
            // console.log(JSON.parse(jsonData));
            res.render('home', {
                title: '主页',
                data: JSON.parse(jsonData)
            })
        })
    })
});

module.exports = router;