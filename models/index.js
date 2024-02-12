// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// TODO: Products belongsTo Category - DONE
Product.belongsTo(Category, {
  foreignKey: 'category_id',
});

// TODO: Categories have *many* Products - DONE
Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE',
});

// TODO: Products belongToMany Tags (through ProductTag) - DONE
Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: 'product_id',
  otherKey: 'tag_id',
  as: 'tags',
});

// TODO: Tags belongToMany Products (through ProductTag) - DONE
Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: 'tag_id',
  otherKey: 'product_id',
  as: 'products',
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
