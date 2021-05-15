require('dotenv').config();

const PORT = 3000;
const express = require('express');

const server = express();

const bodyParser = require('body-parser');
server.use(bodyParser.json());

const apiRouter = require('./api');
server.use('/api', apiRouter);

const morgan = require('morgan');
server.use(morgan('dev'));

server.use((request, response, next) => {
    console.log("Body Logger Start");
    console.log(request.body);
    console.log("Body Logger End");

    next();
})

server.get('/api', (request, response, next) => {
    console.log("a GET request was made");
    response.send( {message: "success"})
});

server.use('/api', (request, response, next) => {
    console.log("a request was made to /api (MIDDLEWARE)")
    next();
});

server.post('/api', (request, response, next) => {
    console.log("a post request was made to");
    response.send({message: "Carne Asada something something"})
});

const { client } = require('./db');
client.connect();

server.listen(PORT, () => {
    console.log('The server is up on port', PORT)
});

