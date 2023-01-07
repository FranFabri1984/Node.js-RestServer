const express = require('express');
var cors = require('cors');
const fileUpload = require('express-fileupload');
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
            up: '/api/uploads',
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
        this.app.use(express.json());
        /* Public Dir. */
        this.app.use(express.static('public'))

        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    Routes() {
        this.app.use(this.paths.auth , require('../routes/auth'));
        this.app.use(this.paths.cat , require('../routes/category'));
        this.app.use(this.paths.pro , require('../routes/product'));
        this.app.use(this.paths.sear , require('../routes/search'));
        this.app.use(this.paths.user , require('../routes/user'));
        this.app.use(this.paths.up , require('../routes/uploads'));
    }

    Listen() {
        this.app.listen(this.port, () => {
        console.log('API Listening:' + this.port)
        });
    }

}

module.exports = Server;