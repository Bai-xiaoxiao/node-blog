// 引入express
var express = require('express');
// 实例化一个express对象
var app = new express();
var path = require('path');

// 由于express本身不支持获取post请求的参数，所以需要用到body-parser中间件
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 引入其他页面的路由
var router = require('./routes');
router(app);

// mongoose连接方法
var mongo = require('./lib/mongo');
mongo();

// 打开任何网址其本质都是一个get请求到的一个页面
// 我们访问的百度https://www.baidu.com/ 其实后面也有一个/
// 也就是访问百度服务器的/接口，它返回一个html页面
// 我们网页的/路径的get请求
app.get('/', (req, res)=>{
    res.end('hello world');
});

app.set('views', path.join(__dirname, 'views')); // 设置存放模板文件的目录
app.set('view engine', 'ejs'); // 设置模板引擎为 ejs

// 开启一个服务,监听8888端口
app.listen(8888, () =>{
    console.log('服务开启成功，地址为http://localhost:8888');
});
