
const db = require('mongoose');
const env = require('./.env');
const uri = `mongodb+srv://${env.USER}:${env.PASS}@cluster0.pnsvs.mongodb.net/${env.DBNAME}?retryWrites=true&w=majority`

db.Promise = global.Promise;

async function connect() {

  await db.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })

  console.log('db conectada con exito')
}

module.exports = connect
