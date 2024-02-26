var express = require('express');
var router = express.Router();
const session = require('express-session')
const passport = require('passport')
require('../google-authintication/Oauth')






/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});


router.get('/chat',(req,res)=>{
  res.render('chat',{title:'My chat'})
})




module.exports = router;
