// 引入express
var express = require('express');
// 实例化一个express对象
var app = new express();

// 打开任何网址其本质都是一个get请求到的一个页面
// 我们访问的百度https://www.baidu.com/ 其实后面也有一个/
// 也就是访问百度服务器的/接口，它返回一个html页面
// 我们网页的/路径的get请求
app.get('/', (req, res)=>{
    res.end('hello world');
});

// 开启一个服务,监听8888端口
app.listen(8888, () =>{
    console.log('服务开启成功，地址为http://localhost:8888');
});
