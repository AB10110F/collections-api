const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Item = require('./Item');

const Comment = sequelize.define('Comment', {
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
  content: {
    type: DataTypes.TEXT,
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

User.hasMany(Comment, {
  foreignKey: 'user_id',
});
Comment.belongsTo(User);

Item.hasMany(Comment, {
  foreignKey: 'item_id',
});
Comment.belongsTo(Item);

module.exports = Comment;
