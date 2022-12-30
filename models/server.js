const express = require('express');
var cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/api/user';
        this.middleWares();
        this.Routes();
    }
    middleWares() {
        this.app.use(cors());
        /* Read and Parse */
        this.app.use(express.json());
        /* Public Dir. */
        this.app.use(express.static('public'))
    }

    Routes() {
        this.app.use(this.userPath , require('../routes/user'));
    }

    Listen() {
        this.app.listen(this.port, () => {
        console.log('API Listening:' + this.port)
        });
    }

}

module.exports = Server;