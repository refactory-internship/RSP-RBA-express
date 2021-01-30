const { Room, Booking, User } = require('../db/models');
const key = require('../config/keys');
const jwt = require("jsonwebtoken");
const { sendMail } = require('../config/transporter');

class bookingController {
    static async index(req, res) {
        const data = await Room.findAll();
        res.json(data);
    }

    static async show(req, res) {
        const data = await Room.findByPk(req.params['id']);
        res.json(data);
    }

    static async createBooking(req, res) {
        const decoded = jwt.verify(req.headers['x-access-token'], key.secretOrKey);
        //since the JWT only contains id of the user, time the token was issued, and its expiration time,
        //we need to get user data by finding it with the id decoded from the payload
        const user = await User.findByPk(decoded.id);

        //booking_time is set with inserting date in a Y-M-D format
        //note that the time of the booking is set to 0 with h:m:s format
        //example input: booking_time = 2021-01-30 (30th January, 2021)
        //booking_time field on the database will set to 2021-01-30 00:00:00, since no time is provided but the date
        const booking_time = new Date(req.body.booking_time)
        //set check in time, issue with time, where the given time is -7. eg. 16 - 7 = 9
        const check_in_time = booking_time.setHours(16, 30);
        //set check out time, issue with time, where the given time is -7. eg. 23 - 7 = 16
        const check_out_time = booking_time.setHours(23, 30);
        //store total person in a variable
        const total_person = req.body.total_person

        await Room.findByPk(req.params['id'])
            .then((room) => {
                if (total_person > room.room_capacity) {
                    res.send({
                        message: 'Total person is more than the room capacity!'
                    });
                } else {
                    Booking.create({
                        UserId: user.id,
                        RoomId: req.params['id'],
                        total_person: total_person,
                        booking_time: req.body.booking_time,
                        note: req.body.note,
                        check_in_time: check_in_time,
                        check_out_time: check_out_time
                    }).then((booking) => {
                        //send user the booking details
                        sendMail(user.email, 'Room Booking Details', 'Hello! This is your details for your booking on our room!');
                        res.json({
                            message: 'An email has been sent to your account!',
                            bookingData: booking
                        })
                    }).catch((err) => {
                        res.json(err);
                    });
                }
            }).catch((err) => {
                res.json(err);
            });
    }

    static async yourBookings(req, res) {
        const decoded = jwt.verify(req.headers['x-access-token'], key.secretOrKey);

        await User.findOne({
            where: {
                id: decoded.id
            }, include: [{
                model: Booking
            }]
        }).then((user) => {
            res.json(user);
        }).catch((err) => {
            res.json(err);
        })
    }

    static async checkIn(req, res) {
        const decoded = jwt.verify(req.headers['x-access-token'], key.secretOrKey);
        //since the JWT only contains id of the user, time the token was issued, and its expiration time,
        //we need to get user data by finding it with the id decoded from the payload
        const user = await User.findByPk(decoded.id);

        const check_in_time = new Date();



        await Booking.findOne({
            where: {
                id: req.params['id']
            }
        }).then((booking) => {
            booking.update({
                check_in_time: check_in_time
            }).then((result) => {
                sendMail(user.email, 'Check-In Details', 'Hello! This is an email regarding your check in on our rooms!')
                res.json({
                    message: 'An email regarding your check in has been sent!',
                    bookingData: result
                });
            }).catch((err) => {
                console.log(err);
            })
        })
    }
}

module.exports = bookingController;