var mongoose = require('mongoose')    //引用mongoose模块
var Schema = mongoose.Schema

//Post Schema

var PostSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    tags: {type:[String]},
    createTime: { type: Date, default: Date.now },
    modifyTime: { type: Date, default: Date.now },
}, {
        collection: 'posts'// the mongdb collection
    }
)

//create a model use schema
var Post = mongoose.model('Post', PostSchema)

//
module.exports = Post


//给model和entity添加一些方法,基本都是将model的查询方法的参数进行封装
PostSchema.static.findByTitle = function (title, cb) {
    Post.findOne({'title':title},function(err,obj){
        cb(err,obj)
    })
}
