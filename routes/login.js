var express = require('express');
var router = express.Router();

router.get('/', (req,res)=>{
    res.render('login');
});

router.post('/entrar', (req,res)=>{
    var login = req.body.loginUser;
    var senha = req.body.senhaUser;
    console.log(login+'-'+senha);
    res.render('login');
});

// router.get('*',(req,res)=>{
//     res.end('<h1>Pagina nao encontrada</h1>')
// })

module.exports = router;