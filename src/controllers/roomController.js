const { Room, PhotoRooms } = require('../db/models');
const cloudinary = require('../middleware/cloudinary');

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
        try {
            //create new room and store it in a variable
            const data = await Room.create({
                room_name: req.body.room_name,
                room_capacity: req.body.room_capacity,
            });

            //if there is any image on the field
            if (req.files) {
                //empty arrays to store urls and public id
                const imageSecureURL = [];
                const imagePublicId = [];
                //store files for looping
                const files = req.files;
                //upload the images to cloudinary
                for (let index = 0; index < files.length; index++) {
                    const path = files[index].path;
                    const upload = await cloudinary.uploader.upload(path, {
                        folder: 'rsp-backend/rooms',
                        public_id: 'roomNo_' + data.id + '_image_' + index
                    });
                    //push the urls and public id into empty array
                    imageSecureURL.push(upload.secure_url);
                    imagePublicId.push(upload.public_id);

                    //store images of the created room into photorooms table
                    PhotoRooms.create({
                        RoomId: data.id,
                        photo: imageSecureURL[index],
                        cloudinary_id: imagePublicId[index]
                    });
                }
                res.json({
                    roomData: data,
                    roomPhoto: imageSecureURL,
                    roomPublicId: imagePublicId
                });

                //if there is no image
            } else if (req.files === undefined) {
                res.json({
                    roomData: data
                });
            }
        } catch (error) {
            console.log(error);
        }
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