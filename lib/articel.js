var mongoose = require('mongoose');
// 默认时间使用moment来转换
var moment = require('moment');

var userSchema = mongoose.Schema({
    title: { type: 'string', required: true }, // 标题
    authorName: { type: 'string', required: true }, // 作者名
    authorId: { type: 'string', required: true }, // 作者id
     // 时间 有默认值时可以不用传
     // type: 'Date'时会把时间储存为UTC时间，这里干脆用string来存了
    publishTime: { type: 'string', default: moment().format('YYYY-MM-DD HH:mm:ss'), required: true },
    content: { type: 'string', required: true }, // 内容
})

var model = mongoose.model('Articel', userSchema);

module.exports = {
    // 添加
    add: function(data,callback){
        (new model(data)).save(function(err, res){
            if(err) return console.error(err);
            // console.log('保存成功');
            callback && callback();
        })
    },

    // 查询
    find: function(data,callback){
        model.find({authorId: data.authorId}, function(err,data){
            if (err) return console.error(err);
            callback && callback(data);
        });
    },

    // 删除
    del: function(){

    },

    // 修改
    change: function(){

    }
};