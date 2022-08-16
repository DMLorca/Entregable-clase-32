const dotenv = require('dotenv');
dotenv.config();

const options_mdb = {
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: process.env.USER_MARIADB,
        password: '',
        database: process.env.DATABASE_MARIADB
    }
}

module.exports = {
    options_mdb
}