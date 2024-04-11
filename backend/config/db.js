const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
    `postgres://${process.env.DEV_DB_USER}:${process.env.DEV_DB_PASSWORD}@${process.env.DEV_DB_HOST}:${process.env.PORT_DB}/${process.env.DEV_DB_NAME}`,
);

try {
    sequelize.authenticate().then(() => {
        console.log("Connection has been established successfully.");
    });
} catch (error) {
    console.error("Unable to connect to the database:", error);
}

const Reservation = require("../models/reservation.model")(
    sequelize,
    DataTypes,
);
const Room = require("../models/room.model")(sequelize, DataTypes);
const Spot = require("../models/spot.model")(sequelize, DataTypes);
const User = require("../models/user.model")(sequelize, DataTypes);
const Role = require("../models/role.model")(sequelize, DataTypes);
const Membership = require("../models/membership.model")(sequelize, DataTypes);

module.exports = { Reservation, Room, Spot, User, Role, Membership };
