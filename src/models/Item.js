const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Collection = require('./Collection');

const Item = sequelize.define('Item', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  collection_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Collection,
      key: 'id'
    }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  timestamps: false
});

Collection.hasMany(Item, {
  foreignKey: 'collection_id',
});
Item.belongsTo(Collection);

module.exports = Item;
