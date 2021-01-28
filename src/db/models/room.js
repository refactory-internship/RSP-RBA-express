'use strict';

module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define('Room', {
    room_name: DataTypes.STRING,
    room_capacity: DataTypes.INTEGER
  });

  Room.associate = models => {
    Room.hasMany(models.Booking);
    Room.hasMany(models.PhotoRooms);
  }
  return Room;
};