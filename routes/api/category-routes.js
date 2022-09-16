const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  const categories = await Category.findAll({
    include: Product
  })
  res.json(categories)
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const category = await Category.findByPk(req.params.id, {
    include: Product
  })
  res.json(category)
});

router.post('/', async (req, res) => {
  // create a new category
  const newCategory = await Category.create({
    category_name: req.body.category_name
  })
  res.json(newCategory)
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  await Category.update({
    category_name: req.body.category_name
  }, {
    where: {
      id: req.params.id
    }
  })
  const category = await Category.findByPk(req.params.id)
  res.json(category)
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  const category = await Category.findByPk(req.params.id)
  await Category.destroy( {
    where: {
      id: req.params.id
    }
  })
  res.json(category)
});

module.exports = router;
