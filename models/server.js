const express = require('express');
var cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            auth: '/api/auth',
            cat: '/api/category',
            pro: '/api/product',
            sear: '/api/search',
            user: '/api/user',
        }
        this.connectDB();
        this.middleWares();
        this.Routes();
    }

     async connectDB() {
        await dbConnection();
     }

    middleWares() {
        this.app.use(cors());
        /* Read and Parse */
        this.app.use(express.json());
        /* Public Dir. */
        this.app.use(express.static('public'))
    }

    Routes() {
        this.app.use(this.paths.auth , require('../routes/auth'));
        this.app.use(this.paths.cat , require('../routes/category'));
        this.app.use(this.paths.pro , require('../routes/product'));
        this.app.use(this.paths.sear , require('../routes/search'));
        this.app.use(this.paths.user , require('../routes/user'));
    }

    Listen() {
        this.app.listen(this.port, () => {
        console.log('API Listening:' + this.port)
        });
    }

}

module.exports = Server;