const Sequelize = require('sequelize');
const readerModel = require('./reader');
const bookModel = require('./book');
const { DB_PASSWORD, DB_NAME, DB_USER, DB_HOST, DB_PORT, } = process.env

const setupDatabase = () => {

    const connection = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
        host: DB_HOST,
        port: DB_PORT,
        dialect: 'mysql',
        logging: false,
    });

    const Reader = readerModel(connection, Sequelize);
    const Book = bookModel(connection, Sequelize);

    connection.sync({ alter: true });
    return {
        Reader, Book
    };
};

module.exports = setupDatabase();