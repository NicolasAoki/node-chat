
var mongoClient = require('mongodb').MongoClient;

mongoClient.connect('mongodb://localhost:27017/chatIndividual', { useNewUrlParser: true },
    function (err, conn) {
        if (err) return console.log('Não conectou ao banco' + err);
        global.db = conn.db('chatIndividual');
    });

function getChat(nameChat, nameUser, callback) {
    global.db.collection('chatUsers').find({ 
        $or: [ 
            { $and : [ { nameChat: nameChat }, { nameUser: nameUser } ] },
            { $and : [ { nameUser: nameChat }, { nameChat: nameUser } ] }
        ]
    }).sort({date: 1}).toArray(
        function (err, docs) {
            if (err) return console.log("algo deu errado" + err);
            callback(docs);
        }
    );
}

function setMsg(nameChat, nameUser, txtMsg, callback){
    global.db.collection('chatUsers').insert({ nameChat: nameChat, nameUser: nameUser, date: new Date(), msg: txtMsg }, 
        function (err, docs) {
            if (err) return console.log("algo deu errado" + err);

                global.db.collection('chatUsers').find({ 
                    $or: [ 
                        { $and : [ { nameChat: nameChat }, { nameUser: nameUser } ] },
                        { $and : [ { nameUser: nameChat }, { nameChat: nameUser } ] }
                        ]
                }).sort({date: 1}).toArray(
                    function (err, docs) {
                    if (err) return console.log("algo deu errado" + err);
                    callback(docs);
                }
                );
        }
    );   
}
function getUser(name, callback) {
    global.db.collection('user').find({ name: name })(
        function (err, docs) {
            if (err) return console.log("Erro ao procurar usuario" + err);
            callback(docs);
        }
    );
}
function exitChat(callback) {}

module.exports = {exitChat, getChat, setMsg ,getUser}

