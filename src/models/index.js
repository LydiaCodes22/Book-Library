const Sequelize = require('sequelize');
const ReaderModel = require('./reader');
const { DB_PASSWORD, DB_NAME, DB_USER, DB_HOST, DB_PORT, } = require('../../scripts/create-database.js')


// const {
//     DB_PASSWORD, DB_NAME, DB_USER, DB_HOST, DB_PORT,
// } = process.env;
// // the above is copied from create-database instead const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;
// console.log(`this is DB_NAME in models index.js ${DB_NAME}`)
// console.log(`this is in models index.js ${process.env.DB_PASSWORD}`)
console.log(`this is in models index.js ${DB_NAME}`)

const setupDatabase = () => {
    // const connection = new Sequelize("book_library_test", "root", "password", {
    //     host: "localhost",
    //     port: 3308,
    //     dialect: 'mysql',
    //     logging: false,
    // });
    const connection = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
        host: DB_HOST,
        port: DB_PORT,
        dialect: 'mysql',
        logging: false,
    });

    const Reader = ReaderModel(connection, Sequelize);

    connection.sync({ alter: true });
    return {
        Reader
    };
};

module.exports = setupDatabase();