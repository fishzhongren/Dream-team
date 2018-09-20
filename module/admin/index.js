
const async = require('async');
const router = express.Router();

router.get('/', (req, res)=>{
   res.render('admin/index');
});

router.get('/home', (req, res)=>{
    res.render('admin/index');
 });

router.get('/tel', (req, res)=>{
    res.render('admin/tel');
 });

 router.post('/search',(req,res)=>{
    let d = req.body;

 });
 router.get('/persontel',(req,res)=>{
    res.render('admin/persontel');
 })

module.exports = router;