'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Photos', [
    {
      name: 'Band-Maid',
      address: 'https://drive.google.com/uc?export=view&id=1X91TlCghfYS-hxo52VudwPfZpcgUhvbw',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Nemophila',
      address: 'https://drive.google.com/uc?export=view&id=1F2TzP--c9SmNhrbH03RoZ8F-0T_KKaRo',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Asterism',
      address: 'https://drive.google.com/uc?export=view&id=1eFRlMyY2haoM2U0QJjRyERFJfgZFTk1n',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Lovebites',
      address: 'https://drive.google.com/uc?export=view&id=1HJxQkpLtUHXnOWqwzD3MSdXgqi_gtKsx',
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
