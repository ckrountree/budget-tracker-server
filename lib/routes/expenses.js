const Router = require('express').Router;
const router = Router();
const Expense = require('../models/expense');
const bodyParser = require('body-parser').json();

router
	.post('/', bodyParser, (req, res, next) => {
    new Expense(req.body, req.params.categoryId)
			.save()
			.then(expense => res.send(expense))
			.catch(next);
})

	.get('/:id', (req, res, next) => {
    const id = req.params.id;
    Expense.findById(id)
			.lean()
			.then(expense => {
    if (!expense) throw { code: 400, error: `${id} not found` };
    else res.send(expense);
})
			.catch(next);
})

    .put('/:id', (req, res, next) => {
        Expense.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        )
            .lean()
            .then(expense => res.send(expense))
            .catch(next);
    })

    .delete('/:id', (req, res, next) => {
        Expense.findByIdAndRemove(req.params.id)
            .then(result => {
                const exists = result != null;
                res.json({
                    removed: exists
                });
            })
            .catch(next);
    });
