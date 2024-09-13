const mongoose = require('mongoose');

const { host, name } = require('../configs/config.mongodb');

const connectString = `${host}/${name}?retryWrites=true&w=majority`;

console.log('connectString::', connectString);

class Database {
    constructor() {
        this.connect();
    }

    connect() {
        mongoose.set('debug', true);
        mongoose.set('debug', { color: true });
        mongoose
            .connect(connectString)
            .then((_) => {
                console.log('Connect Mongodb sucessfully');
            })
            .catch((error) => {
                console.error('Failed to connect to Mongodb', error);
            });
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }

        return Database.instance;
    }
}

module.exports = Database.getInstance();
