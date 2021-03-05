// CAPA DE RED, ENCARGADA DE RECIBIR Y PROCESAR LAS PETICIONES HHTP Y ENVIARLA AL CONTROLADOR

const express = require('express');
const multer = require('multer')
const controller = require('./controller');
const response = require('../network/response');
const router = express.Router();

const upload = multer({ dest: 'public/files/' })

router.get('/', function (req, res) {
	const filterMessages = req.query.chat || null;
	controller.getMessages(filterMessages)
		.then((messageList) => {
			response.success(req, res, messageList, 200)
		})
		.catch(e => {
			response.error(req, res, 'error inesperado', 500, e)
		})

});

router.post('/', upload.single('file'), function (req, res) {
	controller.addMessage(req.body.chat, req.body.user, req.body.message, req.file)
		.then((fullMessage) => {
			response.success(req, res, fullMessage);
		})
		.catch(() => {
			response.error(req, res, 'Informacion invalida', 400, 'Error en el controlador');
		});
});

router.patch('/:id', function (req, res) {
	controller.updateMessage(req.params.id, req.body.message)
		.then((data) => {
			response.success(req, res, data, 200);
		})
		.catch(e => {
			response.error(req, res, 'Error interno', 500, e)
		})
})

// PORQUE ME SIGUE SALIENDO QUE PUEDO ELIMINAR EL MENSAJE (EL OBJETO EN DB) Si YA LO ELIMINE ?

router.delete('/:id', function (req, res) {
	controller.deleteMessage(req.params.id || null)
		.then(() => {
			response.success(req, res, `usuario ${req.params.id} eliminado`, 200)
		})
		.catch(e => {
			response.error(req, res, 'Error interno', 500, e)
		})
})

module.exports = router;
