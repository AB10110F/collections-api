const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Item = require('./Item');

const Like = sequelize.define('Like', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  item_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Item,
      key: 'id'
    }
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

User.hasMany(Like, {
  foreignKey: 'user_id',
});
Like.belongsTo(User);

Item.hasMany(Like, {
  foreignKey: 'item_id',
});
Like.belongsTo(Item);

module.exports = Like;
