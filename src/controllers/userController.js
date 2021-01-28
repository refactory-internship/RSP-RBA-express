const { User } = require('../db/models');

class userController {
    static async allAccess(req, res) {
        res.status(200).send("Public Content.");
    }

    static async adminBoard(req, res) {
        await User.findOne({
            where: {
                RoleId: 1
            }
        }).then((user) => {
            res.status(200).send({
                message: 'Hello! You are an admin!',
                id: user.id,
                email: user.email,
            });
        })
    }

}

module.exports = userController;