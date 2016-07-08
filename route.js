
var Account = require('./model/account')
    , Post = require('./model/post')
    , crypto = require('crypto')

module.exports = function (app) {

    app.get('/', function (req, res) {
        Post.find().limit(5).exec(function (err, posts) {
            if (err) {
                req.flash('error', "获取首页文章失败")
            }
            res.render('index', {
                posts: posts,
                user: req.session.user,
                success: req.flash('success').toString(),
                error: req.flash('error').toString()
            })
        })


    })

    app.get('/reg', checkNotLogin)
    app.get('/reg', function (req, res) {
        res.render('register', {
            user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        })
    })

    app.post('/reg', checkNotLogin)
    app.post('/reg', function (req, res) {
        var newUsername = req.body.username
            , passwd = req.body.password
            , passwd2 = req.body.password2
        if (newUsername == "Enter Username") {
            req.flash('error', '用户名不能为空')
            return res.redirect('/reg')
        }
        if (passwd != passwd2) {
            req.flash('error', '两次密码不一致')
            return res.redirect('/reg')
        }
        //password md5
        var md5 = crypto.createHash('md5')
        passwd = md5.update(passwd).digest('hex')

        var newUser = new Account({
            username: newUsername,
            password: passwd,
            email: req.body.email
        })
        //检查用户名是否存在
        Account.findOne({ username: newUsername }, function (err, user) {
            if (user) {
                req.flash('error', '用户存在了')
                return res.redirect('/reg')
            }
            //if not exist, save the new user
            newUser.save(function (err, user) {
                if (err) {
                    req.flash('error', err)
                    return res.redirect('/reg')
                }
                req.session.user = newUser
                req.flash('success', '注册成功')
                res.redirect('/')
            })
        })
    })




    app.get('/login', checkNotLogin);
    app.get('/login', function (req, res) {
        res.render('login', { user: req.session.user })
    })


    app.post('/login', checkNotLogin);
    app.post('/login', function (req, res) {
        var loginname = req.body.username
            , md5 = crypto.createHash('md5')
            , passwd = md5.update(req.body.password).digest('hex')
        //check username
        Account.findOne({ username: loginname }, function (err, user) {
            if (!user) {
                req.flash('error', '用户不存在')
                return res.redirect('/login')
            }
            //check password
            if (passwd != user.password) {
                req.flash('error', '密码错误')
                return res.redirect('/login')
            }
            //save info to session
            req.session.user = user
            req.flash('success', '登录成功')
            res.redirect('/')
        })
    })



    //logout
    app.get('/logout', function (req, res) {
        if (!req.session.user) {
            req.flash('error', '未登录')
            return res.redirect('/login')
        }
        req.session.user = null;
        req.flash('success', '登出成功!');
        res.redirect('/');//登出成功后跳转到主页
    })

    //links
    app.get('/links', function (req, res) {
        res.render("index", {
            success: "这个页面放一些重要的链接，暂时没有完成"
        })
    })
    //tags
    app.get('/links', function (req, res) {
        res.render("index", {
            success: "这个页面暂时没有完成"
        })
    })

    //new post
    app.get('/add', function (req, res) {
        res.render("edit", {})
    })

    //new post
    app.get('/add', function (req, res) {
        res.render("edit", {})
    })

    app.post('/add', checkLogin)
    app.post('/add', function (req, res) {
        var reqtitle = req.body.title,
            reqcontent = req.body.content,
            reqtags = req.body.tags
        var tagsArr = reqtags.split(",")
            , newPost = new Post({
                title: reqtitle,
                content: reqcontent,
                author: req.session.user.username,
                tags: tagsArr
            })

        newPost.save(function (err) {
            if (err) {
                req.flash('error', err);
                return res.redirect('/add');
            }
            req.flash('success', '发布成功!');
            res.redirect('/');//发表成功跳转到主页
        })


    })



}//module.exprts


//util methods

var checkLogin = function (req, res, next) {
    if (!req.session.user) {
        req.flash('error', '未登录')
        return res.redirect('/login')

    }
    next()
}
var checkNotLogin = function (req, res, next) {
    if (req.session.user) {
        req.flash('error', '已登录')
        return res.redirect('/')
    }
    next()
}