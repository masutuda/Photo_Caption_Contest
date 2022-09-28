'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Caption extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Caption.belongsTo(models.User, {foreignKey: 'user_id'})
      Caption.belongsTo(models.Photo, {foreignKey: 'photo_id'})
    }
  }
  Caption.init({
    user_id: DataTypes.INTEGER,
    photo_id: DataTypes.INTEGER,
    caption: DataTypes.TEXT
  }, {
    sequelize,
    tableName: 'Captions',
    modelName: 'Caption',
  });
  return Caption;
};