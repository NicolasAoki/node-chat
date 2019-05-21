
var mongoClient = require('mongodb').MongoClient;

mongoClient.connect('mongodb://localhost:27017/chatIndividual', { useNewUrlParser: true },
    function (err, conn) {
        if (err) return console.log('Não conectou ao banco' + err);
        global.db = conn.db('chatIndividual');
    });

function saveUser(name, passWord, callback) {
    global.db.collection('user').insert({ name,  passWord }, function (err, result) {
        if (err) return console.log("Erro ao salvar usuario" + err);
        callback();
    });
}

function getUser(name, callback) {
    global.db.collection('user').find({ name: name })(
        function (err, docs) {
            if (err) return console.log("Erro ao procurar usuario" + err);
            callback(docs);
        }
    );
}

function checkUser(logName, callback) {
    global.db.collection('user').find({name: logName}).count(function (err, docs) {
        if (err) return console.log("Erro ao encontrar usuario pelo nome" + err);
        callback(docs);
    });
}

function checkPasswordUser(logName, logPassword, callback) {
    console.log('function'+logName+logPassword);
    global.db.collection('user').find({ name: logName, password: logPassword }).count(function (err, docs) {
        if (err) return console.log("Erro ao verificar usuario e senha" + err);
        callback(docs);
    });
}

module.exports = { saveUser, getUser, checkUser, checkPasswordUser }

