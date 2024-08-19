const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Item = require('./Item');
const Tag = require('./Tag');

const ItemTags = sequelize.define('ItemTags', {
  tag_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Tag,
      key: 'id',
    },
  },
  item_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Item,
      key: 'id',
    },
  },
});

Item.belongsToMany(Tag, { through: ItemTags });
Tag.belongsToMany(Item, { through: ItemTags });

module.exports = ItemTags;
