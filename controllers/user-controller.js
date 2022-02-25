const User = require("../models/users-model");

module.exports = {
    findUsers: function (req,res, next) {
        User.find({}, (err, users) => {
            if (err) {
                return next(err);
            } else {
                res.statusCode = 200;
                res.setHeader('Content_type', 'application/json');
                res.json(users);
            }
        })
    },
    registerUser: async function (req,res, next) {
        try {
            let user = new User({
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                password: req.body.password
            })
            await user.save()
            const token = await user.generateAuthToken()
            res.status(201).send({ user, token })

        } catch (error) {
            res.status(400).send(error)
        }
    },
    loginUser: async function (req,res, next) {
        try {
            const { email, password } = req.body
            const user = await User.findByCredentials(email, password)

            if (!user) {
                return res.status(401).send({error: 'Login failed! Check authentication credentials'})
            }
            const token = await user.generateAuthToken()
            res.send({ user, token })
        } catch (error) {
            res.status(400).send(error)
        }
    },
    showMyUserAccount: function (req,res,next) {
        res.send(req.user)
    },
    logOut: async function (req,res,next) {
        try {
            req.user.tokens = req.user.tokens.filter((token) => {
                return token.token !== req.token
            })
            await req.user.save()
            res.send()
        } catch (error) {
            res.status(500).send(error)
        }
    }
}


