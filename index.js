// 引入express
var express = require('express');
// 实例化一个express对象
var app = new express();
var path = require('path');

// 通过gzip / deflate压缩响应数据. 
// 这个中间件应该放置在所有的中间件最前面以保证所有的返回都是被压缩的
var compression = require('compression')
app.use(compression());
// app.use(compression({ filter: shouldCompress }))
// function shouldCompress(req, res) {
//     if (req.headers['x-no-compression']) {
//         // 这里就过滤掉了请求头包含'x-no-compression'
//         return false
//     }

//     return compression.filter(req, res)
// }

// 由于express本身不支持获取post请求的参数，所以需要用到body-parser中间件
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 引入session中间件
var session = require('express-session');
app.use(session({
    secret: 'secret', // 对session id 相关的cookie 进行签名
    resave: true, // 是否允许session重新设置
    // rolling是否按照原设定的maxAge值重设session同步到cookie中
    // 有操作时重写cookie，保证用户在操作时不过期
    rolling: true,
    saveUninitialized: false, // 是否保存未初始化的会话
    cookie: {
        maxAge: 1000 * 60 * 10  // 保存时间
    }
}));

app.use(function (req, res, next) {
    // 每次都会执行这一段语句
    // 可以在这里遍历需要登录才能进入的页面
    var arr = [
        '/home',
        '/personal',
    ];
    var needLogin = arr.find(function (url) {
        return url === req.path
    })
    if (needLogin && !req.session.userName) {
        // 需要登录并且没有session
        // 直接跳转到登录页面，不走下一步
        res.redirect('/sign')
        return;
    }
    next();
});

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
app.get('/', (req, res) => {
    // res.end('hello world');
    // res.redirect('/home');
    res.redirect('/index');
});

app.set('views', path.join(__dirname, 'views')); // 设置存放模板文件的目录
app.set('view engine', 'ejs'); // 设置模板引擎为 ejs
// 静态资源无法访问，加这个
app.use(express.static(__dirname + '/'));

// 开启一个服务,监听8888端口
app.listen(8888, () => {
    console.log('服务开启成功，地址为http://localhost:8888');
});
