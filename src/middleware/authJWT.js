const jwt = require("jsonwebtoken");
const config = require("../config/keys");
const { User } = require("../db/models");

verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'];

    jwt.verify(token, config.secretOrKey, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: 'You need to login first!'
            });
        }
        req.userId = decoded.id;
        next();
    });
}

isAdmin = (req, res, next) => {
    User.findOne({
        where: { id: req.userId },
        include: 'Role'
    }).then((user) => {
        if (user.Role.name === 'Admin') {
            next();
            return;
        } else {
            res.status(403).send({
                message: "Forbidden! You are a " + user.Role.name
            });
            return;
        }
    });
}

const authJWT = {
    verifyToken: verifyToken,
    isAdmin: isAdmin
}

module.exports = authJWT;
