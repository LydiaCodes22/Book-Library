//Make sure that name, email and password exist and cannot be empty

// Make sure that email is in the correct format

// Make sure password is longer than 8 characters

// Make sure the controller knows how to handle the different error messages the model might throw.

// Don't forget to write tests that support this functionality

module.exports = (connection, DataTypes) => {
    const schema = {
        name: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true,
            }
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: { args: true, msg: "email must not be empty" },
                isEmail: { args: true, msg: "email must be in a valid format" }
            }
        },
        password: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true,
                min: 8,
            }
        }
    };

    const readerModel = connection.define('Reader', schema);
    return readerModel;
};
