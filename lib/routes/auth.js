const Router = require('express').Router;
const router = Router();
const User = require('../models/user');
const ensureAuth = require('../utils/ensure-auth');
const bodyParser = require('body-parser').json();

router
    .get('/verify', ensureAuth, (req, res) => {
        res.send({ verified: true });
    })    

    .post('/signup', bodyParser, (res, req) => {
        const { email, password } = req.body;
        delete req.body.password;

        if(!password) throw { code: 400, error: 'Password is required' };

        User.emailExists(email)
            .then(exists => {
                if(exists) {
                    throw { code: 400, error: 'Email already exists' };
                }
                const user = new User(req.body);
                user.generateHash(password);

                return user.save();
            });
    });

