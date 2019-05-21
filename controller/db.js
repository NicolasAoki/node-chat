
var mongoClient = require('mongodb').MongoClient;

mongoClient.connect('mongodb://localhost:27017/mongo-web', { useNewUrlParser: true },
    function (err, conn) {
        if (err) return console.log('Não conectou ao banco' + err);
        global.db = conn.db('mongo-web');
    });



module.exports = {}