var express = require('express')
var util = require('./util')
var router = express.Router()
var Account = require('../model/account')
var Post = require('../model/post')


// GET home page.显示博客列表
router.get('/', function (req, res) {
    var session = req.session
    session.count = session.count || 0
    var n = session.count++

    res.render('index', { title: 'pug sample', sessionId: session.id, count: n, username: req.username },
        function (err, html) {
            if (err) console.log(err)
            else res.send(html)
        })

})



//注册页面，先检查是否已经登录

router.get('/register', function (req, res) {
    res.render('register', {})
})

// handler the sign up 
router.post('/register', function (req, res, next) {
    console.log('registering user')
    var account = new Account({ username: req.body.username, password: req.body.password })
    Account.register(account, req.body.password, function (err) {

        if (err) {
            console.log('save the account failed!' + err)
            return next(err)
        }

        console.log('register success!!!')
        res.redirect('/')
        // req.session.save(function (err) {
        //   if (err) return next(err)
        //   res.render('index', { title: req.body.username },
        //     function (err, html) {
        //       if (err) console.log(err)
        //       else res.send(html)
        //     })
        // })
    })
})


router.get('/login', function (req, res) {
    res.render('login', { username: req.username })
})

router.post('/login', passport.authenticate('local'), function (req, res) {
    res.redirect('/')
})


// router.get('/logout', function (req, res, next) {
//     req.logout()
//     req.session.clear(function (err) {
//         if (err) {
//             return next(err)
//         }
//         res.redirect('/')
//     })
// })


module.exports = router
