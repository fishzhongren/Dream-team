
const async = require('async');
const multer = require('multer');
const router = express.Router();

router.get('/', (req, res)=>{
    res.render('front/index');
});

router.get('/talk', (req, res)=>{
    res.render('front/talk');
});

router.get('/zhuce', (req, res)=>{
    res.render('front/zhuce');
});

router.post('/talk', (req, res)=>{

    let data=req.body;
    console.log(data);
    var str='';
    for(top of data.photo){
        var str =str+','+top;
    }
  
    let sql = 'SELECT * FROM stuadmin';
    conn.query(sql, (err, result)=>{
        // console.log(result);
        console.log(132);
        let nickname=result.nickname;
        let sql ="INSERT INTO active(title, nikename,datetime, content, photo) VALUES (?,?,?,?,?)";
    // let str = '';
    conn.query(sql,[data.title,nickname,new Date().toLocaleString(),data.content,str],(err,result)=>{
        if(err){
            console.log(err);
            res.json({r:'err'});
            return ;
        }
        res.json({r:'success'});
        })
        
       
    });

    // let sql ="INSERT INTO active(title, nikename,datetime, content, photo) VALUES (?,?,?,?,?,?,?) "

});


module.exports = router;