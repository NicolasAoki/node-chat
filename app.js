let http = require('http'),
    express = require('express'),
    path = require('path'),
    app = express();
var cookieParser = require('cookie-parser');

var loginRouter = require('./routes/login');
var chatRouter = require('./routes/chat');

app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'hbs');
app.use(express.urlencoded({extended:false}));

// Verificar como utilizar documento estatico para assets
app.use(express.static(path.join(__dirname, 'assets/')));

app.use(cookieParser());

app.use('/',loginRouter);
app.use('/',chatRouter);


http.createServer(app).listen(3000);