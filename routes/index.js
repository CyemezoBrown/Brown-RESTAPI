let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
   res.render('index', { title: 'Test node app deployment in Heroku ' });
});

module.exports = router;
