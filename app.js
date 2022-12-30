
require('dotenv').config();
const Server = require('./models/server');

console.log('Welcome to the api rest');

const sever = new Server();

sever.Listen();




