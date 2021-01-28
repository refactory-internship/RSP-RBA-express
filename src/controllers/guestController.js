const { Room, Booking, User } = require('../db/models');
const key = require('../config/keys');
const jwt = require("jsonwebtoken");


class guestController {
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

        //create fake time for development
        const booking_time = new Date();
        const check_in_time = booking_time;
        //check out time is 6 hours after check in
        const check_out_time = check_in_time.setHours(check_in_time.getHours() + 6);

        await Booking.create({
            UserId: decoded.id,
            RoomId: req.params['id'],
            total_person: req.body.total_person,
            booking_time: booking_time,
            note: req.body.note,
            check_in_time: check_in_time,
            check_out_time: check_out_time
        }).then((booking) => {
            res.json(booking);
        }).catch((err) => {
            res.json(err);
        });
    }
}

module.exports = guestController;