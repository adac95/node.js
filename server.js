// DE AQUI CORRE LA APLICACION

const express = require('express');
const bodyParser = require('body-parser');

// const router = require('./components/message/network');
const router = require('./components/network/routes');

let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(router);
router(app);

app.use('/app', express.static('public'));

app.listen(3000, console.log('corriendo servidor en puerto 3000'));
