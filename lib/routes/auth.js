const Router = require('express').Router;
const router = Router();
const User = require('../models/user');
const ensureAuth = require('../utils/ensure-auth');
const tokenService = require('../utils/token-service');

function hasRequiredFields(req, res, next) {
    const user = req.body;

    if(!user || !user.password) {
        return next({
            code: 400,
            error: 'Email and Password are required'
        });
    }
    next();
}

router
    .get('/verify', ensureAuth, (req, res) => {
        res.send({ verified: true });
    })    

    .post('/signup', hasRequiredFields, (req, res, next) => {
        console.log(req.body, 'WWWXXX');
        const { email, password } = req.body;
        delete req.body.password;

        if(!password) throw { code: 400, error: 'Password is required' };

        User.emailExists({ email })
            .then(exists => {
                if(exists) {
                    throw { code: 400, error: 'Email already exists' };
                }
                const user = new User({ email });
                user.generateHash(password);

                return user.save();
            })
            .then(user => {
                return tokenService.sign(user)
                    .then(token => {
                        user.hash = null;
                        res.send({ token, user });
                    });
            })
            .catch(next);
    })

    .post('/signin', hasRequiredFields, (req, res, next) => {
        const { email, password } = req.body;
        delete req.body.password;

        User.findOne({ email })
        .then(user => {
            if(!user || !user.comparePassword(password)) {
                throw { code: 401, error: 'Invalid Login' };
            }
            return user;
        })
        .then(user => {
            return tokenService.sign(user)
            .then(token => {

                user.hash = null;
                res.send({ token, user });
            });
        })
        .catch(next);
    });

module.exports = router;


