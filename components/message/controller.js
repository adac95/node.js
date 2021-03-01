//  LOGICA DE LA APLICACION

const store = require('./store');

// para peticion POST

function addMessage(user, message) {
	return new Promise((resolve, reject) => {
		if (!user || !message) {
			console.log('error');
			reject('Los datos son incorrectos');
			return false;
		}

		const fullMessage = {
			user,
			message,
			date: new Date(),
		};

		store.add(fullMessage)
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
