// 各种模块
global.express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cookieParser = require('cookie-parser');
const session = require('express-session');
global.md5 = require('md5');
const svgCaptcha = require('svg-captcha');
global.multer = require('multer');
// 模块引用部分结束位置
const app = express();
// 定义各种参数
let hostname = 'http://localhost:81/';

let secret = 'course.app.myweb.www';
//启用中间件
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser(secret));
// 模板引擎设置
app.engine('html',ejs.renderFile);
app.set('view engine', 'html');
app.set('views', './views');
//数据库连接
global.conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    port:3306,
    database:'haha'
});
conn.connect();
// 启用session
app.use(session({
    secret:secret,
    resave:true,
    saveUninitialized:true,
    cookie: {maxAge:30*24*3600*1000}
}));

// 文件上传
global.diskstorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `./uploads/${new Date().getFullYear()}/${(new Date().getMonth()+1).toString().padStart(2, '0')}`);
    },
    filename: function (req, file, cb) {
        let filename = new Date().valueOf() + '_' +  Math.random().toString().substr(2, 8) + '.' + file.originalname.split('.').pop();
        cb(null, filename)
    }
});
global.upload = multer({storage: diskstorage});
// 验证码图片
app.get('/coder',(req, res)=>{
    var captcha = svgCaptcha.create({noise:4,ignoreChars: '0o1i', size:1,background:'#593fff',height:38,width:100});
    req.session.coder = captcha.text;

    res.type('svg'); //使用ejs等模板时如果报错res.type('html')
    res.status(200).send(captcha.data);
});
app.post('/uploads',upload.array('photo',1000),(req,res)=>{
    console.log(req.files);

    global.data = [];
    for (const ad of req.files) {
        let path = hostname+ad.path.replace(/\\/g,'/');
        data.push(path);
    }
    res.json({
        "errno": 0,
        "data": data
    });
});

// 子路由
// 管理员登陆
//静态资源托管
app.use('/admin/login',require('./module/admin/login'));
// 管理员管理子路由
app.use('/admin',require('./module/admin/index'));

// 前台用户子路由
app.use('/',require('./module/front/'));

app.use('/uploads', express.static('uploads'));
app.use( express.static('static'));

app.listen(81, ()=>{
    console.log('成功启动~~~~~~');
});