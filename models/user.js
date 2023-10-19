'use strict';
const {
  Model
} = require('sequelize');
const UserSchema = require('./schema/user');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.AuthenticityTokens = this.hasMany(models.AuthenticityToken)
    }
  }
  const { tableAttributes } = UserSchema(sequelize, DataTypes)
  User.init(tableAttributes, {
    sequelize,
    modelName: 'User',
  });
  return User;
};