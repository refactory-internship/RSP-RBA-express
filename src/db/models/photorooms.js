'use strict';

module.exports = (sequelize, DataTypes) => {
  const PhotoRooms = sequelize.define('PhotoRooms', {
    photo: DataTypes.STRING,
    cloudinary_id: DataTypes.STRING
  });

  PhotoRooms.associate = models => {
    PhotoRooms.belongsTo(models.Room)
  }
  return PhotoRooms;
};