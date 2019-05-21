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
    loginDAO.checkPasswordUser(name, password, function (docs) {
        console.log('qwe');
        if(docs){
            console.log('1');
            console.log('passa aqui');
            res.cookie('login',name);
            //res.redirect('/chat/'+name+" "+name);
            res.redirect('chat');
            return;
        } else{
            console.log('2');
            res.render('login', { title: 'Login', senhaLog: 'Dados incorretos'});
        }  
    });
});


module.exports = router;