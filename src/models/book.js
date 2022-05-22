//const { Sequelize } = require("sequelize");

module.exports = (connection, DataTypes) => {
    const schema = {
        title: DataTypes.STRING,
        author: DataTypes.STRING,
        genre: DataTypes.STRING,
        ISBN: DataTypes.STRING
    };

    const bookModel = connection.define('Book', schema);
    return bookModel;
};
