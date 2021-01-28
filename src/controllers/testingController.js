const { User } = require('../db/models');
const cloudinary = require('../middleware/cloudinary');
// const Role = require('../db/models/role');


class testingController {
    static async get(req, res) {
        await User.findOne({
            where: { id: req.params['id'] },
            include: 'Role'
        })
            .then((user) => {
                // res.json(user);

                if (user.Role.name === 'Admin') {
                    res.status(200).send({
                        message: "You are an admin"
                    })
                } else {
                    res.status(403).send({
                        message: "You are a guest"
                    });
                }
            })
            .catch((err) => {
                console.log('Error while finding user and its relationship: ' + err);
            });
        // await User.findByPk(req.params['id']).then((user) => {
        //     res.json(user);  
        // });
    }

    static async create(req, res) {
        const data = await User.create({
            RoleId: 2,
            email: req.body.email,
            password: req.body.password,
            photo: req.body.photo
        });
        res.json(data);
    }

    static async upload(req, res) {
        // const file = req.file;
        // console.log(file);
        // console.log(req.file)
        const now = new Date;
        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        const day = now.getDate();
        const date = day + '_' + month + '_' + year;

        try {
            //upload image to cloudinary
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'rsp-backend/users/',
                public_id: 'testing_' + date,
                overwrite: true
            });
            res.json(result);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = testingController;