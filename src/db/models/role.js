"use strict";

module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    name: DataTypes.STRING,
  },
    { timestamps: false });

  Role.associate = models => {
    Role.hasMany(models.User);
  }

  return Role;
};
