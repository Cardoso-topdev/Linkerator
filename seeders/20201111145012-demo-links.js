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

    return await queryInterface.bulkInsert('links', [
        {
            url: 'Google.com',
            comment: 'Most powerful serch engine in the world',
            count: 0,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            url: 'Yahoo.com',
            comment: 'The search engine that helps you find exactly what you\'re looking for. Find the most relevant information, video, images, and answers from all across the Web.',
            count: 0,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            url: 'Slack.com',
            comment: 'Slack is a new way to communicate with your team. It\'s faster, better organized, and more secure than email.',
            count: 0,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            url: 'Gitter.com',
            comment: 'Gitter is a chat and networking platform that helps to manage, grow and connect communities through messaging, content and discovery.',
            count: 0,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            url: 'Heroku.com',
            comment: 'Heroku is a platform as a service (PaaS) that enables developers to build, run, and operate applications entirely in the cloud.',
            count: 0,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            url: 'Netlify.com',
            comment: 'Deploy modern static websites with Netlify. Get CDN, Continuous deployment, 1-click HTTPS, and all the services you need. Get started for free.',
            count: 0,
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
    return await queryInterface.bulkDelete('links', null, {});
  }
};
