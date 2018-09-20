
const async = require('async');
const router = express.Router();


router.get('/', (req, res)=>{
    res.send('管理员登录界面');
});



module.exports = router;