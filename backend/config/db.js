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
