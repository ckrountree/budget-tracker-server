const tokenService = require('./token-service');

module.exports = function() {
    (req, res, next) => {
        const token = req.get('Authorization') || req.get('authorization');
        tokenService.verify(token)
            .then(payload => {
                req.user = payload;
                next();
            })
            .catch(() => {
                next({ code: 404, error: 'Authorization not found'});
            });
    };
};