const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
// Load User model
const { User } = require("../../db/models");

// Load input validation
const validateLoginInput = require("../../validation/login");

class loginController {
    static async login(req, res) {
        // Form validation
        const { errors, isValid } = validateLoginInput(req.body);

        // Check validation
        if (!isValid) {
            return res.status(400).json(errors);
        }

        // Find user by email
        User.findOne({
            where: { email: req.body.email },
            include: 'Role'
        })
            .then((user) => {
                // Check if user exists
                if (!user) {
                    return res.status(404).send({
                        message: "Email not found"
                    });
                }

                // Check password
                bcrypt.compare(req.body.password, user.password)
                    .then((isMatch) => {
                        if (isMatch) {
                            // User matched
                            // Create JWT Payload
                            jwt.sign({ id: user.id }, keys.secretOrKey, { expiresIn: 86400 }, (err, token) => {
                                res.json({
                                    token: "Bearer " + token,
                                    id: user.id,
                                    email: user.email,
                                    photo: user.photo,
                                    cloudinary_id: user.cloudinary_id,
                                    role: user.Role.name
                                });
                            }
                            );
                        } else {
                            return res
                                .status(400)
                                .send({
                                    message: "Password incorrect"
                                });
                        }
                    });
            });
    }
}

module.exports = loginController