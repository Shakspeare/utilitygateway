var app = require('express')();
var bodyParser = require('body-parser');
var cors = require('cors');
var port=process.env.port||3000;

app.use(cors())
app.use(bodyParser.json())

app.get('/test', function (req, res) {
    res.send({ name: 'test', email: 'test@gmail.com', phone: '9791135458', subject: 'my first mail', message: 'hello word', domain: 'test' })
});
app.listen(port);