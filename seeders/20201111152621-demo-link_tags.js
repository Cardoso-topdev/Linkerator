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
    return queryInterface.bulkInsert('link_tags', [
        {
            link_id: 1,
            tag_id: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            link_id: 1,
            tag_id: 2,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            link_id: 1,
            tag_id: 6,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            link_id: 2,
            tag_id: 2,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            link_id: 2,
            tag_id: 3,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            link_id: 2,
            tag_id: 6,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            link_id: 3,
            tag_id: 4,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            link_id: 3,
            tag_id: 3,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            link_id: 4,
            tag_id: 5,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            link_id: 4,
            tag_id: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            link_id: 4,
            tag_id: 5,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            link_id: 5,
            tag_id: 3,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            link_id: 5,
            tag_id: 4,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            link_id: 6,
            tag_id: 5,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            link_id: 6,
            tag_id: 2,
            createdAt: new Date(),
            updatedAt: new Date()
        },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return await queryInterface.bulkDelete('link_tags', null, {});
  }
};
