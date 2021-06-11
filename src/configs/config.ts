let CONFIG = {};
if(process.env.NODE_ENV === 'production') {
    CONFIG = {
        MONGO_URI: process.env.MONGO_URI,
        PORT: process.env.PORT
    };
} else {
    CONFIG = {
        MONGO_URI: 'mongodb://localhost:27017/desafio-ripley',
        PORT: 5000
    };
}

module.exports = CONFIG;