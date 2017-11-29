const Router = require('express').Router;
const router = Router();
const Category = require('../models/category');

router
    .post('/', (req, res, next) => {
        new Category(req.body)
          .save()
          .then(category => res.send(category))
          .catch(next);
    })
    .get('/', (req, res, next) => {
        Category.find()
            .lean()
            .then(categories => res.send(categories))
            .catch(next);
    })
    .get('/:id', (req, res, next) => {
        const id = req.params.id;
        Category.findById(id)
          .lean()
          .then(category => {
              if (!category) throw { code: 400, error: `${id} not found` };
              else res.send(category);
          })
          .catch(next);
    })
    .put('/:id', (req, res, next) => {
        Category.findByIdAndUpdate(req.params.id, req.body, {new: true})
            .then(category => res.send(category))
            .catch(next);
    })
  .delete('/:id', (req, res, next) => {
      Category.findByIdAndRemove(req.params.id)
          .then(response => {
              res.send({ removed: !!response });
          })
          .catch(next);
  });

module.exports = router;