const express = require('express');
const message = require('../message/network');
const user = require('../user/network');
const chat = require('../chat/network');

const routes = (server) => {
	server.use('/message', message);
	server.use('/user', user);
	server.use('/chat', chat);
};

module.exports = routes;
