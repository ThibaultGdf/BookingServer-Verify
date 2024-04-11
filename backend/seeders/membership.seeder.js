"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("Memberships", [
            {
                loyalty_status: "Gold",
                number_of_reservations: 1,
                expiration_date: new Date(),
                id_user: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Memberships", null, {});
    },
};
