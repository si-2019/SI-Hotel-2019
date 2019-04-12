
var express = require('express')
var app = express()
app.listen(process.env.PORT || 9123)

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('./requests/aminaReqs.js')(app)
require('./requests/hanaReqs.js')(app)
require('./requests/harisReqs.js')(app)
require('./requests/nejiraReqs.js')(app)
require('./requests/rijadReqs.js')(app)

module.exports = app







