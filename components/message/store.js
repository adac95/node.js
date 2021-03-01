//  LOGICA DE ALMACENAMIENTO  - MOC ?

const db = require('mongoose');
const env = require('../../.env');
const Model = require('../message/model');
const { updateMessage } = require('./controller');

const uri = `mongodb+srv://${env.USER}:${env.PASS}@cluster0.pnsvs.mongodb.net/${env.DBNAME}?retryWrites=true&w=majority`

db.Promise = global.Promise;
db.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })

console.log('db conectada')

// add
function addMessage(message) {

  const myMessage = new Model(message)
  myMessage.save();
}

// list
async function getMessages(filterUser) {

  let filter = {}
  if (filterUser !== null) {
    filter = {
      user: filterUser
    }
  }

  const messages = await Model.find(filter);
  return messages;
}

//  PATCH / UPDATE

async function updateText(id, message) {
  const foundMessage = await Model.findById(id);

  // estoy sobreescribiendo el nuevo mensaje capturado sobre el mensaje anterior registrado
  foundMessage.message = message;
  const newMessage = await foundMessage.save();
  return newMessage;
}

//  DELETE 

async function deleteMessage(id) {

  const deleteModel = await Model.findByIdAndRemove(id)
  return deleteModel;

}

module.exports = {
  add: addMessage,
  list: getMessages,
  // get
  update: updateText,
  delete: deleteMessage,
}
