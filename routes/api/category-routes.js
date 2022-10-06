const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [
      {
        model: Product
      }
    ]
  })
    .then((CategoryFindings) => {
      res.json(CategoryFindings);
    }) 
    .catch((err) => {
      res.json(err);
    });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
    Category.findByPk({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Product
        }

      ]
    })
    .then((idandProduct) => {
      res.json(idandProduct);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  })
    .then((newCategory) => {
      // Send the newly created row as a JSON object
      res.json(newCategory);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then((updateCategory) => {
    res.json(updateCategory);
  })
  .catch((err) => {
    res.json(err);
  })
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then((destroyedCategory) => {
    res.json(destroyedCategory);
  })
  .catch((err) => {
    res.json(err);
  })
});

module.exports = router;
