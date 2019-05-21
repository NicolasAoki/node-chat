var express = require('express');
var router = express.Router();
var loginDAO =  require('../model/login');

router.get('/', (req,res)=>{
    res.render('login');
});
router.get('/cadastrar', (req,res)=>{
    res.render('cadastroUsuario');
});
router.post('/cadastrarUsuario', (req,res)=>{
    var name = req.body.loginUser;
    var password = req.body.senhaUser;
    console.log(name+password);
    if(!name.trim() || !password.trim()){
        res.render('cadastroUsuario', { title: 'Cadastrar', warning: 'Preencha todos os campos!' });
    }
    loginDAO.checkUser(name, function (docs) {
        if(docs){
          res.render('login', { title: 'Cadastrar', warning: 'Usuario ja existe!!'});
        } else{
            loginDAO.saveUser(name, password,
            function () { res.render('login',{title: 'Login', warning: 'registrado com sucesso!'}) });
        }  
      });
    
});

router.post('/entrar', (req,res)=>{
    var name = req.body.loginUser;
    var password = req.body.senhaUser;
    console.log(name+password);
    if(!name || !password){
        res.render('login', { title: 'Login', warning: 'Preencha todos os campos!' });
    }
    loginDAO.checkPasswordUser(name, password, function (docs) {
        if(docs){
            res.cookie('login',name);
            //res.redirect('/chat/'+name+" "+name);
            res.redirect('chat');
            return;
        } else{
            
            res.render('login', { title: 'Login', warning: 'Dados incorretos'});
        }  
    });
});


module.exports = router;