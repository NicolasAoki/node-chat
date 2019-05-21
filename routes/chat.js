var express = require('express');
var router = express.Router();
var chatDAO =  require('../model/chat');

/* GET login listing. */
router.get('/chat/:name', function (req, res, next) {
    if(req.params.name === req.cookies.login){
        res.render('chat', { title: 'Chat' + ' ' + req.params.name, nameUser: req.params.name });
        return;
    }else{
        res.redirect('/');
    }
  });

/* POST exit. */
router.post('/exit', function (req, res, next) {
    res.clearCookie('login',req.cookies.login);
    res.redirect('/exit');
  });
  
  /* POST Peoples. */
  router.get('/listPeople', function (req, res, next) {
    var path = require('../../app');
    //console.log("diretorio"+ path.get('dirCenter')); 
    var options = {
      root: path.get('dirCenter'),
      dotfiles: 'deny',
      headers: {
          'x-timestamp': Date.now(),
          'x-sent': true
      }
    };
    
    var fileName = '../views/listPeople.hbs';
    res.sendFile(fileName, options, function (err) {
      if (err) {
        console.log('Sent:', err);
        next(err);
      } else {
        console.log('Sent:', fileName);
      }
    });
   });
  
   /* Get ListChat. */
   router.get('/listChat', function (req, res, next) {
    var path = require('../app');
    //console.log("diretorio"+ path.get('dirCenter')); 
    var options = {
      root: path.get('dirCenter'),
      dotfiles: 'deny',
      headers: {
          'x-timestamp': Date.now(),
          'x-sent': true
      }
    };
  
    var fileName = '../views/listChat.hbs';
    res.sendFile(fileName, options, function (err) {
      if (err) {
        console.log('Sent:', err);
        next(err);
      } else {
        console.log('Sent:', fileName);
      }
    });
   });
  
  /* POST Chat. */
  router.post('/getChat',function(req,res,next){
    //console.log( 'abc:' + req.body.lastNameChat);
    chatDAO.getChat( req.body.nameChat,
                              req.body.nameUser,
                              function(docs){
                                res.json(docs);
                              });
  });
  
  /* POST Users. */
  router.post('/list', function (req, res, next) {
    var name = req.body.name;
    console.log(name+"estes");
    switch (name) {
      case '': case null: case undefined: {
          var context = {
            people: [
              { name: 'User', lastName: 'not found' },
            ]
          };
          res.json(context.people);
        break;
      };
      default: {
        chatDAO.getUser(name, function (docs) {
          res.json(docs);
        });
        break;
      };
    };
  });
  
  /* POST conversation. */
  router.post('/conversation', function (req, res, next) {
    var txtMsg = req.body.txtMsg;
    var nameChat = req.body.nameChat;
    var nameUser = req.body.nameUser;
    chatDAO.setMsg(nameChat, nameUser, txtMsg, function(docs){
        //console.log('route\n'+docs);
        res.json(docs);
    });
  });
  
module.exports = router;