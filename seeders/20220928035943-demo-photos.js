'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Photos', [
    {
      name: 'Band-Maid',
      address: 'bandmaid.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Nemophila',
      address: 'nemophila.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Asterism',
      address: 'asterism.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Lovebites',
      address: 'lovebites.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
