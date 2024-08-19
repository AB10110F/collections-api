const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Collection = require('./Collection');

const Tag = sequelize.define('Tag', {
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

Collection.hasMany(Tag, {
  foreignKey: 'collection_id',
});
Tag.belongsTo(Collection);

module.exports = Tag;
