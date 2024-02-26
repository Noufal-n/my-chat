var express = require('express');
var router = express.Router();
const passport = require('passport')
require('../google-authintication/Oauth')


function logincheck(req, res, next) {
  req.user ? next() : res.sendStatus(403);
}



/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.user){
    res.redirect('/chat-socket')
  }else{
    res.render('login');

  }
});


router.get('/chat',
    passport.authenticate('google', {
        successRedirect: '/chat-socket',
        failureRedirect: '/failure'
    }))

router.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }))


router.get('/failure', (req, res) => {
  res.send('something went wrong')
})
router.get('/logout',(req,res)=>{
  req.logout(out=>{
     
      req.session.destroy()
      res.send('logout')
  })
 
})

router.get('/chat-socket',logincheck,(req,res)=>{

  res.render('chat',{title:'My chat',img:req.user.photos[0].value})
})




module.exports = router;
