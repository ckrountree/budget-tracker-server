const request = require('./request');
const assert = require('chai').assert;
const db = require('./db');

describe('Authorization api', () => {

    beforeEach(db.drop);

    let token = null;
    beforeEach(() => {
        return request
            .post('/api/auth/signup')
            .send({
                email: 'ck@me.com',
                password: 'please'
            })
            .then(({ body }) => {
                token = body.token;});
    });
    
    it('signup', () => {
        assert.ok(token);
    });

    it('returns error for email already in use', () => {
        return request
            .post('/api/auth/signup')
            .send({ email: 'ck@me.com', password: 'please' })
            .then( () => {
                throw new Error('Email already used.'); },
            err => { assert.equal(err.status, 400); });
    });

    it('tests signin with same credentials', () => {
        return request
            .post('/api/auth/signin')
            .send({ email: 'ck@me.com', password: 'please' })
            .then(({ body }) => {
                assert.isOk(body.token);
            });
    });
    
    it('rejects with a bad password', () => {
        return request
            .post('/api/auth/signin')
            .send({ email: 'ck@me.com', password: 'baaad' })
            .then(() => { throw new Error('Unexpected successful response'); },
                err => {
                    assert.equal(err.status, 401);
                });
    });

    it('gets payload', () => {
        request
            .get('/api/auth/verify')
            .set('Authorization', token)
            .then((res) => assert.deepEqual(res, { verified: true }));
    });
});