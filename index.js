
var mysql = require('mysql')
let con = mysql.createConnection({
    host: 'remotemysql.com',
    user: 'TYQcLL35gV',
    password: 'BLysSj9ZrP',
    database: 'TYQcLL35gV'
})
con.connect()


var express = require('express')
var app = express()
app.listen(process.env.PORT || 9123)

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('./requests/aminaReqs.js')(app, con)
require('./requests/hanaReqs.js')(app, con)
require('./requests/harisReqs.js')(app, con)
require('./requests/nejiraReqs.js')(app, con)
require('./requests/rijadReqs.js')(app, con)



con.query('select * from Anketa', (err, res) => {
    console.log(err, res[0])
})


module.exports = app







