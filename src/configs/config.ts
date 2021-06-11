let CONFIG = {};
if(process.env.NODE_ENV === 'production') {
    CONFIG = {
        MONGO_URI: process.env.MONGO_URI,
        PORT: process.env.PORT,
        PRIVATE_KEY: process.env.PRIVATE_KEY
    };
} else {
    CONFIG = {
        MONGO_URI: 'mongodb://localhost:27017/desafio-ripley',
        PORT: 3200,
        PRIVATE_KEY: 'HmimKAWwtq[@aEW'
    };
}

module.exports = CONFIG;