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

});