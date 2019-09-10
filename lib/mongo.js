var mongoose = require('mongoose');

function mongo() {
    // 连接
    mongoose.connect('mongodb://localhost:27017/myblog',{useNewUrlParser:true});

    // 获取db的链接状态
    var db = mongoose.connection;

    db.on('error', function () {
        console.log('数据库链接失败');
    })

    db.once('open', function () {
        console.log('数据库链接成功-_-');
    });

    // 定义schema,这是什么东西？？？ 
    // 1.像一个对象一样
    // var userSchema = mongoose.Schema({
    //     name: String // string类型的字段name
    // });

    // 添加方法
    // userSchema.methods.speak = function(){
    //     var greeting = this.name
    //     ? '我的名字是' + this.name
    //     : "暂时还没有名字";
    //     console.log(greeting);
    // }

    // 再把schema编译成一个model
    // 在myblog集合下，创建的User表
    //var User = mongoose.model('User', userSchema);

    // new一个对象出来
    // 以后想存这个user就直接new一个对象就行了
    // var xiaoming = new User({
    //     name: '一号用户'
    // });

    // 把这个对象save到数据库
    // xiaoming.save(function(err,data){
    //     if(err) return console.error(err);
    //     xiaoming.speak();
    // });
}

module.exports = mongo;