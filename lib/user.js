var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    userName: { type: 'string', required: true },
    password: { type: 'string', required: true }
})

var model = mongoose.model('User', userSchema);

module.exports = {
    // 添加用户
    add: function(data,callback){
        (new model(data)).save(function(err, res){
            if(err) return console.error(err);
            console.log('保存成功');
            callback && callback();
        })
    },

    // 查询用户
    find: function(data,callback){
        // 第二个参数不传password得到  { _id: 5d663e4a6b4fef09d8302b7f, userName: 'admin' }
        // 传入password之后得到 { _id: 5d663e4a6b4fef09d8302b7f, userName: 'admin', password: '888' }
        // 传入对应字段才会返回对应字段
        // 这里查询userName == data.userName && password == data.password
        model.findOne({'userName': data.userName, 'password': data.password},'_id userName', function(err,data){
            if (err) return console.error(err);
            callback && callback(data);
        });
    },

    // 删除用户
    del: function(){

    },

    // 修改用户
    change: function(){

    }
};