## express4-mongndb-blog
一个简易的express博客系统，只有基本功能，作为学习nodejs用

这是学习nodejs的一周，通过参考[N-blog](https://github.com/nswbmw/N-blog/wiki/_pages)完成的博客系统。

因为只用了几天学习，前端页面和css都是自己手写的，pug（Jade）的语法不熟悉，界面非常简陋，    
整个系统只有两个功能，登录管理和新建博客并显示，使用mongodb保存session，只有登录后才可以新建博客，新建博客后返回首页，显示5篇博客内容。
没有更新博客，评论等功能，评论功能可以只接通过前端增加多说，降低系统数据库的复杂性，当然，nosql的评论几乎不增加复杂性。



主要文件都在app.js route.js两个中，第一个文件是主文件，添加了主要中间件，route文件响应各种请求，这里把响应函数放在一个文件了，更好的做法是将响应函数放到其他文件，在route文件中添加函数名即可，让route.js类似Spring中的HandlerMapping。

###使用说明
```
1.启动mongodb服务
2.命令行 $npm install
3.开发： $npm run watch 
  上面的watch命令是定义的package.json中的命令，是由nodemen提供的，它会监视文件修改，重新启动app.js。是开发的一大利器  
4.直接启动 $npm start ;这也是定义在package.json中的命令 
```
截图文件夹：

