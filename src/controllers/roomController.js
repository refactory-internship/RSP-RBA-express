const { Room } = require('../db/models');

class roomController {
    static async index(req, res) {
        const data = await Room.findAll();
        res.json(data);
    }

    static async create(req, res) {
        res.send({
            message: "form to create a room"
        })
    }

    static async store(req, res) {
        const data = await Room.create({
            room_name: req.body.room_name,
            room_capacity: req.body.room_capacity,
            photo: req.body.photo
        });
        res.json(data);
    }

    static async show(req, res) {
        const data = await Room.findByPk(req.params['id']);
        res.json(data);
    }

    static async edit(req, res) {
        const data = await Room.findByPk(req.params['id']);
        res.json(data);
    }

    static async update(req, res) {
        await Room.update(req.body, {
            where: {
                id: req.params['id']
            }
        });
        res.status(200).send({
            message: 'Room successfully updated'
        });
    }

    static async delete(req, res) {
        await Room.destroy({
            where: {
                id: req.params['id']
            }
        });
        res.status(200).send({
            message: 'Room successfully deleted'
        });
    }
}

module.exports = roomController