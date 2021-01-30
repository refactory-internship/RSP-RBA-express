"use strict";

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        photo: DataTypes.STRING,
        cloudinary_id: DataTypes.STRING
    });

    User.associate = models => {
        User.belongsTo(models.Role);
        User.hasMany(models.Booking)
    }

    return User;
};
