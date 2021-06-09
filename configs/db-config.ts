if(process.env.NODE_ENV === 'production') {
    module.exports = require('./db-config.prod');
} else {
    module.exports = require('./db-config.dev');
}