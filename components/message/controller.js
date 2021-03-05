//  LOGICA DE LA APLICACION

const store = require('./store');
const socket = require('../../socket').socket;

// para peticion POST

function addMessage(chat, user, message, file) {
	return new Promise((resolve, reject) => {
		if (!chat || !user || !message) {
			console.error('[messageController] No hay chat, usuario o mensaje');
			reject('Los datos son incorrectos');
			return false;
		}

		let fileUrl = '';
		if (file) {
			fileUrl = `http://localhost:3000/app/files/${file.filename}`
		}

		const fullMessage = {
			chat,
			user,
			message,
			date: new Date(),
			file: fileUrl,
		};

		store.add(fullMessage)

		socket.io.emit('message', fullMessage)

		return resolve(fullMessage);
	});
}
// para peticion GET

function getMessages(filterUser) {
	return new Promise((resolve, reject) => {
		resolve(store.list(filterUser))
	})

}

// para peticion PATCH 

function updateMessage(id, message) {
	return new Promise(async (resolve, reject) => {
		if (!id || !message) {
			reject('Invalid data');
			return false
		}
		const result = await store.update(id, message);
		return resolve(result);
	})
}

// para peticion DELETE 

function deleteMessage(id) {
	return new Promise(async (resolve, reject) => {
		if (!id) {
			reject('Error, no se pudo eliminar')
			return false
		}

		await store.delete(id)
			.then(() => {
				resolve()
			})
			.catch(e => {
				reject(e);
			});
	})
}

module.exports = {
	addMessage,
	getMessages,
	updateMessage,
	deleteMessage,
};
