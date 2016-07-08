var mongoose = require('mongoose')
var Schema = mongoose.Schema

var AccountSchema = new Schema({
    username: String,
    password: String,
	email: String
},{collection: 'accounts'})
//schema表示一个集合，包括集合内部数据类型的约束
//model对象提供和该集合交互的方法，并且是document实例的构造函数，entity表示一个具体的document
//向model对象或者entity添加方法：
//向model添加方法：SchemaName.statics.findByName =
//向entity添加方法：SchemaName.methods.findSimilarTypes=
//  var mongoose = require('mongoose');
//  var db = mongoose.connect('mongodb://localhost/myApp');
//  var userSchema = new mongoose.Schema({name:String,password:String});
//  var userModel =db.model('userlists',userSchema);
//  var anand = new userModel({ name: 'anand', password: 'abcd'});
//  anand.save(function (err, docs) {
//    if (err) {
//        console.log('Error');
//    } else {
//        userModel.count({name: 'anand'}, function(err, c) {
//            console.log('Count is ' + c);
//       });
//    }
//  }); 

//具体model有哪些方法，查看文档，常用的功能都不用自己定义方法，更新和model查询是重点
//model.create /entity.save(callback)
Account = mongoose.model('account', AccountSchema) //Account is a model

module.exports = Account
