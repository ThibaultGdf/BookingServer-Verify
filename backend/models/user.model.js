"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    User.init(
        {
            first_name: DataTypes.STRING,
            last_name: DataTypes.STRING,
            email: DataTypes.STRING,
            phone_number: DataTypes.STRING,
            password: DataTypes.STRING,
            id_role: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: sequelize.models.User,
                    key: "id",
                },
            },
        },
        {
            sequelize,
            modelName: "User",
        },
    );
    return User;
};
