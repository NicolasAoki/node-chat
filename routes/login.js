var express = require('express');
var router = express.Router();
var loginDAO =  require('../model/login');

router.get('/', (req,res)=>{
    res.render('login');
});
router.get('/cadastrar', (req,res)=>{
    res.render('cadastroUsuario');
});
router.get('/cadastrarUsuario', (req,res)=>{
    
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