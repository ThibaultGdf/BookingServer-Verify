"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Membership extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Membership.init(
        {
            loyalty_status: DataTypes.STRING,
            number_of_reservations: DataTypes.INTEGER,
            expiration_date: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "Membership",
        },
    );
    return Membership;
};
