const dev = {
    host: process.env.DEV_DB_HOST || 'mongodb+srv://lthphuc21:24032003@airbnb-clone.sr4nvdo.mongodb.net',
    name: process.env.DEV_DB_NAME || 'airbnbDev',
    port: process.env.DEV_DB_PORT || 27017,
};

const config = { dev };
const env = process.env.NODE_ENV || 'dev';

module.exports = config[env];
