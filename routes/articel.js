// 文章模块
var express = require('express');
var router = express.Router();

router.get('/list', function(req, res){
    // 根据pageIndex和pageSize返回对应的条数
    // req.query.pageIndex
    var listArr = [];
    for (let i = 0; i < req.query.pageSize; i++) {
        listArr.push({
            id: i,
            title: `文章名${i}${i}${i}`,
            desc: `${i}${i}${i}的描述`,
        })
    }
    res.json({
        count: listArr.length,
        list: listArr
    })
});

router.get('/detail/:id', function(req, res){
    // 可以用req.params.id 获取/detail/888的参数
    res.set('Content-Type','text/plain');
    res.end(`我是${req.params.id}的内容详情`);
});

module.exports = router;