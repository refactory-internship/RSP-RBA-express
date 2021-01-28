"use strict";

module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    total_person: DataTypes.INTEGER,
    booking_time: DataTypes.DATE,
    note: DataTypes.TEXT,
    check_in_time: DataTypes.DATE,
    check_out_time: DataTypes.DATE
  });

  Booking.associate = models => {
    Booking.belongsTo(models.User);
    Booking.belongsTo(models.Room);
  }
  return Booking;
};
