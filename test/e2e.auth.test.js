// const request = require('./request');
// const assert = require('chai').assert;
// const db = require('./db');

// describe('Authorization api', () => {

//     beforeEach(db.drop);

//     let token = null;
//     beforeEach(() => {
//         return request
//         .post('/api/auth/signup')
//         .send({
//             email: 'user',
//             password: 'please'
//         })
//         .then(({ body }) => token = body.token);
//     });
    
//     it('signup', () => {
//         assert.ok(token);
//     });

//     it('returns error for email already in use', () => {
//         return request
//             .post('/api/auth/signup')
//             .send({ email: 'user', password: 'please' })
//             .then( () => {
//                 throw new Error('Email already used.'); },
//             err => { assert.equal(err.status, 400); });

//     });
// });