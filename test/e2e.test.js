const mongoose = require('mongoose');
const assert = require('chai').assert;
const request = require('./request');

describe('categories api', () => {
    beforeEach(() => mongoose.connection.dropDatabase());

    const vacation = {
        id: '5a1de26c6f71da3feb306482',
        timestamp: new Date('2017-11-29'),
        name: 'vacation',
        budget: 750
    };

    it('saves a category', () => {
        return request.post('/api/categories')
            .send(vacation)
            .then(res => {
                const cat = res.body;
                console.log('this is my category', cat);
                assert.ok(cat._id);
                assert.equal(cat.name, vacation.name);
                assert.equal(cat.budget, vacation.budget);
            });
    }); 

    it('returns 400 for a bad id', () => {
        return request.get('/api/categories/5a1de26c6f71da3feb306453')
        .then(
            () => { throw new Error('Unexpected successful response'); },
            err => {
                assert.equal(err.status, 400);
            }
        );
    });

    it('deletes by id', () => {
        let category = null;
        return request.post('/api/categories')
        .send(vacation)
        .then(res => {
            category = res.body;
            return request.delete(`/api/categories/${category._id}`);
        })
        .then(res => {
            assert.deepEqual(res.body, { removed: true });
            return request.get(`/api/categories/${category._id}`);
        })
        .then(
            () => { throw new Error('Unexpected successful response'); },
            err => {
                assert.equal(err.status, 400);
            }
        );
    });

    it('gets all categories', () => {
        const groceries = {
            id: '5a1de26c6f71da3feb306484',
            timestamp: new Date('2017-11-29'),
            name: 'groceries',
            budget: 500
        };

        const allCats = [vacation, groceries].map(category => {
            return request.post('/api/categories')
            .send(category)
            .then(res => res.body);
        });

        let saved = null;
        return Promise.all(allCats)
        .then(_saved => {
            saved = _saved;
            return request.get('/api/categories');
        })
        .then(res => {
            assert.deepEqual(res.body, saved);
        });
    });
});