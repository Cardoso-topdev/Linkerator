'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return await queryInterface.bulkInsert('tags', [
        {
            name: 'Search',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Development',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Communication',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Dev Ops',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Clouding Service',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Engine',
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return await queryInterface.bulkDelete('tags', null, {});
  }
};
