const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static('public'));

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var apis = require('./routes/apis');
app.use('/', apis);

app.listen(3000, () => console.log('Server running on http://localhost:3000'));

// module.exports = app;
