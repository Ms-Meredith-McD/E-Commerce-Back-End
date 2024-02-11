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
    const payload = await Category.update(
      req.body, 
      {
        where: {
          id: req.params.id
        }
      }
    )
    res.json(payload)
  } catch( err ){
    res.status(500).json({ error: err.message })
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
