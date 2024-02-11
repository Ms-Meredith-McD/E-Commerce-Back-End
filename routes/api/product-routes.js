const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
// TODO: find all products
// be sure to include its associated Category and Tag data - DONE
router.get('/', async (req, res) => {
  try {
    const payload = await Product.findAll({
      include: [
        {
          model: Category,
          foreignKey: "category_id",
          attributes: ["category_name"],
        },
        {
          model: Tag,
          as: "products_tag",
          attributes: ["tag_name"],
        },
      ],
    }),
      res.json(payload);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// get one product
  // TODO: find a single product by its `id`
  // be sure to include its associated Category and Tag data - DONE
  router.get('/:id', async (req, res) => {
    const payload = await Product.findByPk(req.params.id,{
      include:
      [
        {
          model: Category,
          foreignKey: "category_id",
          attributes: ["category_name"],
        },
        {
          model: Tag,
          as: "products_tag",
          attributes: ["tag_name"],
        },
      ],
    })
    res.json(payload);
  });

// create new product - DONE
router.post('/', (req, res) => {
  // TODO:
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]  - DONE
    }
  */
    Product.create(req.body)
    .then((product) => {
      // TODO:
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model - DONE 
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // TODO:
      // if no product tags, just respond - DONE
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', (req, res) => {
  // TODO: update product data - DONE
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      if (req.body.tagIds && req.body.tagIds.length) {

        ProductTag.findAll({
          where: { product_id: req.params.id }
        }).then((productTags) => {
          //create filtered list of new tag_ids
          const productTagIds = productTags.map(({ tag_id }) => tag_id);
          const newProductTags = req.body.tagIds
            .filter((tag_id) => !productTagIds.includes(tag_id))
            .map((tag_id) => {
              return {
                product_id: req.params.id,
                tag_id,
              };
            });

          //figure out which ones to remove
          const productTagsToRemove = productTags
            .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
            .map(({ id }) => id);
          //run both actions
          return Promise.all([
            ProductTag.destroy({ where: { id: productTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags),
          ]);
        });
      }

      return res.json(product);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// TODO: delete one product by its `id` value - DONE
router.delete('/:id', async (req, res) => {
  try {
    await Product.destroy(
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
