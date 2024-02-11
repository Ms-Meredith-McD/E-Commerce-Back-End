const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
// Product = require('../../models/Product'); 

// The `/api/tags` endpoint

// TODO: find all tags
// be sure to include its associated Product data - DONE
router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: Product
    });
    res.json(tags);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve tags' });
  }
});

  // TODO: find a single tag by its `id`
  // be sure to include its associated Product data - DONE
  router.get('/:id', async (req, res) => {
    try {
      const tag = await Tag.findByPk(req.params.id, {
        include: Product
      });
  
      if (!tag) {
        res.status(404).json({ error: 'Tag not found' });
        return;
      }
  
      res.json(tag);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to retrieve tag' });
    }
  });


// TODO: create a new tag - DONE
  router.post('/', async (req, res) => {
    try {
      const tag = await Tag.create(req.body);
      res.status(201).json(tag);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to create tag' });
    }
  });

// TODO: update a tag's name by its `id` value - DONE
  router.put('/:id', async (req, res) => {
    try {
      const tag = await Tag.findByPk(req.params.id);
  
      if (!tag) {
        res.status(404).json({ error: 'Tag not found' });
        return;
      }
  
      await tag.update(req.body);
      res.json(tag);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to update tag' });
    }
  });

// TODO: delete on tag by its `id` value - DONE
router.delete('/:id', async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id);

    if (!tag) {
      res.status(404).json({ error: 'Tag not found' });
      return;
    }

    await tag.destroy();
    res.json({ message: 'Tag deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete tag' });
  }
});

module.exports = router;
