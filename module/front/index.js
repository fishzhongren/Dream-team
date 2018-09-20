
const async = require('async');
const router = express.Router();

router.get('/', (req, res)=>{
    res.send('用户界面');
});




module.exports = router;