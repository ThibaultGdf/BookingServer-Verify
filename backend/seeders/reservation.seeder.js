"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("Reservations", [
            {
                name: "John Doe",
                date: new Date(),
                note: "Une table au calme",
                number_of_customers: 4,
                status: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Reservations", null, {});
    },
};
