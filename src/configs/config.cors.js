dev = {
    origin: process.env.FRONTEND_DEV_URL || 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200,
};

prod = {
    origin: process.env.FRONTEND_PROD_URL || '',
    credentials: true,
    optionSuccessStatus: 200,
};

const corsOptions = {
    dev,
    prod,
};

const env = process.env.NODE_ENV || 'dev';

module.exports = corsOptions[env];
