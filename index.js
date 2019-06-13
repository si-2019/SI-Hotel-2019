


var express = require('express')
var app = express()
app.listen(process.env.PORT || 9123)

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var cors = require('cors')
app.use(cors())

const db = require('./models/db')

var connection = {
    query: function(sql, callback) {
        db.sequelize.query(sql).then(result => {
            callback(null, result[0])
        }).catch(error => {
            callback(error, null)
        })
    }
}

require('./requests/aminaReqs.js')(app, connection, db)
require('./requests/hanaReqs.js')(app, connection, db)
require('./requests/harisReqs.js')(app, connection, db)
require('./requests/nejiraReqs.js')(app, connection, db)
require('./requests/rijadReqs.js')(app, connection, db)
db.sequelize.sync().then(function(){
    console.log("Uspjesno povezano");
}).catch(function(err){
     console.log("Nije uspjesno povezano");
     console.log(err);
});


var proxy = require('http-proxy-middleware')
appAPI = express()
appAPI.use(
    '/api',
    proxy({
        target: 'http://localhost:9123',
        changeOrigin: true,
        pathRewrite: {
            '^/api/': '/', // rewrite path
          },
    })
)
appAPI.listen(31908)


module.exports = app







