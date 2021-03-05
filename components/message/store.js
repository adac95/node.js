//  LOGICA DE ALMACENAMIENTO  - MOC ?

const Model = require('../message/model');

// add
function addMessage(message) {

  const myMessage = new Model(message)
  myMessage.save();
}

// list
async function getMessages(filterUser) {

  return new Promise((resolve, reject) => {
    let filter = {}
    if (filterUser !== null) {
      filter = {
        user: filterUser
      }
    }
    Model.find(filter)
      .populate('user')
      .exec((error, populated) => {
        if (error) {
          reject(error)
          return false
        };
        resolve(populated);
      })
  })
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
  // let deleteID = Model.deleteOne({ _id: id })
  // const deleteModel = await Model.update(deleteID)

  const deleteMessages = await Model.deleteOne({ _id: id })
  return deleteMessages;

}

module.exports = {
  add: addMessage,
  list: getMessages,
  // get
  update: updateText,
  delete: deleteMessage,
}
