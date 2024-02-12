const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// TODO: find all categories
  // include its associated Products  - DONE
  router.get('/', async (req, res) => {
    const payload = await Category.findAll({
      include: [Product]
    })
    res.json(payload);
  });

//TODO: find one category by its `id` value
  // be sure to include its associated Products - DONE
  router.get('/:id', async (req, res) => {
    const payload = await Category.findByPk(req.params.id,{
      include: [Product]
    })
    res.json(payload);
  });

// TODO: create a new category  - DONE
  router.post('/', async (req, res) => {
    try {
      const payload = await Category.create(req.body)
      res.json(payload);
    } catch( err ) {
      res.status(500).json({ error: err.message })
    }
  });


//TODO: update a category by its `id` value - DONE
router.put('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
  
    if (!category) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }

    await category.update(req.body);
    res.json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update category' });
  }
});

  //TODO: delete a category by its `id` value - DONE
  router.delete('/:id', async (req, res) => {
    try {
      await Category.destroy(
        {
          where: {
            id: req.params.id
          }
        }
      )
      res.json({ status: "ok" })
    } catch( err ){
      res.status(500).json({ error: err.message })
    }
  });

module.exports = router;
