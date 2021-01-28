const bcrypt = require("bcryptjs");
const cloudinary = require('../../middleware/cloudinary');

// Load User model
const { User } = require("../../db/models");

// Load input validation
const validateRegisterInput = require("../../validation/register");

class registerController {
    static async register(req, res) {
        // Form validation
        const { errors, isValid } = validateRegisterInput(req.body);

        // Check validation
        if (!isValid) {
            return res.status(400).json(errors);
        }

        await User.findOne({
            where: {
                email: req.body.email
            }
        }).then((user) => {
            if (user) {
                return res.status(400).json({
                    message: "Email already exists!"
                });
            } else if (req.file !== undefined) {
                //setting the filename
                //name of the user
                const user_email = req.body.email;
                const user_name = user_email.substring(0, user_email.lastIndexOf('@'));
                //time uploaded
                const now = new Date;
                const year = now.getFullYear();
                const month = now.getMonth() + 1;
                const day = now.getDate();
                const date = day + '_' + month + '_' + year;

                //upload image to cloudinary
                cloudinary.uploader.upload(req.file.path, {
                    folder: 'rsp-backend/users/',
                    public_id: user_name + '_' + date,
                    overwrite: true
                }).then((result) => {
                    // res.json(result);
                    User.create({
                        RoleId: 2,
                        email: req.body.email,
                        password: bcrypt.hashSync(req.body.password, 10),
                        photo: result.secure_url,
                        cloudinary_id: result.public_id
                    }).then((user) => {
                        res.json(user);
                    });
                }).catch((err) => {
                    console.log(err);
                });
            } else {
                User.create({
                    RoleId: 2,
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, 10),
                    photo: null,
                    cloudinary_id: null
                }).then((user) => {
                    res.json(user);
                }).catch((err) => {
                    console.log(err);
                })
            }
        });
    }
}

module.exports = registerController;