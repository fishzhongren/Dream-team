
const async = require('async');
const router = express.Router();

router.get('/', (req, res)=>{
   res.send('管理员主页');
});



module.exports = router;