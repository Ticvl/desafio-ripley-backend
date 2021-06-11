let CONFIG = {};
if(process.env.NODE_ENV === 'production') {
    CONFIG = {
        MONGO_URI: process.env.MONGO_URI,
        PORT: process.env.APP_PORT,
        CORS_ORIGIN: process.env.CORS_ORIGIN
    };
} else {
    CONFIG = {
        MONGO_URI: 'mongodb://localhost:27017/desafio-ripley',
        PORT: 5000,
        CORS_ORIGIN: ["http://heroku.amazonaws.com:8080", ""]
    };
}

module.exports = CONFIG;