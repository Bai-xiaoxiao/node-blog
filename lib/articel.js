var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    title: { type: 'string', required: true }, // 标题
    authorName: { type: 'string', required: true }, // 作者名
    authorId: { type: 'string', required: true }, // 作者id
     // 时间 有默认值时可以不用传
    publishTime: { type: 'Date', default: Date.now, required: true },
    content: { type: 'string', required: true }, // 内容
})

var model = mongoose.model('Articel', userSchema);

module.exports = {
    // 添加
    add: function(data,callback){
        (new model(data)).save(function(err, res){
            if(err) return console.error(err);
            console.log('保存成功');
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