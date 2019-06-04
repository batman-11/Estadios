'use strict';
module.exports = (sequelize, DataTypes) => {
  const estadiosfutbols = sequelize.define('estadiosfutbols', {
    stadium: DataTypes.STRING,
    city: DataTypes.STRING,
    capacity: DataTypes.INTEGER
  }, {});
  estadiosfutbols.associate = function(models) {
    // associations can be defined here
  };
  return estadiosfutbols;
};