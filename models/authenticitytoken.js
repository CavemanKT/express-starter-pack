'use strict';
const {
  Model
} = require('sequelize');
const AuthenticityTokenSchema = require('./schema/authenticity_token');
module.exports = (sequelize, DataTypes) => {
  class AuthenticityToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AuthenticityToken.User = this.belongsTo(models.User)
    }
  }
  const { tableAttributes } = AuthenticityTokenSchema(sequelize, DataTypes)
  AuthenticityToken.init(tableAttributes, {
    sequelize,
    modelName: 'AuthenticityToken',
  });
  return AuthenticityToken;
};