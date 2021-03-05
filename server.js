// DE AQUI CORRE LA APLICACION

const express = require('express');
const app = express();
const server = require('http').Server(app);

const bodyParser = require('body-parser');
const socket = require('./socket');
const connect = require('./db');
const router = require('./components/network/routes');

connect();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

socket.connect(server);

router(app);

app.use('/app', express.static('public'));

server.listen(3000, console.log('corriendo servidor en puerto 3000'));
