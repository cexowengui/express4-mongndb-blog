var settings = require('./settings')
var express = require('express')
var favicon = require('serve-favicon');
var path = require('path')
var morgan = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var session = require('express-session')
const MongoStore = require('connect-mongo')(session)
var flash = require('connect-flash')// write msg in session obj :req.flash('error', '未登录!'); 

const mongoose = require('mongoose')
mongoose.connect(settings.mongo_url)

//load the routers
var route = require('./route')


var app = express()


app.set('view engine', 'pug')
app.set('views', __dirname + '/views')
app.set('env','development')

app.use(morgan('dev'))
app.use(bodyParser.json()) // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname+'/public',{etag: true}))
app.use(favicon(__dirname + '/public/fav.ico'))
app.use(flash())

app.use(cookieParser(settings.cookieSecret))
//session
app.use(session({
    store:new MongoStore({ mongooseConnection: mongoose.connection }),
    secret:settings.cookieSecret,
    cookie:{ maxAge:5000*1000},
    resave: false,
    saveUninitialized: false
    //rolling: true //？forces a cookie set on every response. This resets the expiration date
}))



//use the router handler the requests
route(app)

//
// error handlers
//
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            status: err.status,
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        status: err.status,
        message: err.message,
        error: {} //不要暴露错误栈
    });
});


app.listen(8080,function(){
    console.log("app is starting,listen on port 8080... ")
})

