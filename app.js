let http = require('http'),
    express = require('express'),
    path = require('path'),
    app = express();

app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'hbs');
app.use(express.urlencoded({extended:false}));

// Verificar como utilizar documento estatico para assets
// app.use('/assets/img', express.static('public'));

var loginRouter = require('./routes/login');


app.use(loginRouter);


// app.post('/insert_mensagem_post',(req,res)=>{
//     let msg = req.body.mensagemPost;
//     console.log(msg);
//     res.end();
// });

http.createServer(app).listen(3000);