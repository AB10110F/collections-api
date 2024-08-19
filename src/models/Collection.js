const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Collection = sequelize.define('Collection', {
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
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  category: {
    type: DataTypes.ENUM('Fountain Pens', 'Books', 'Coins', 'Keyboards', 'Other'),
    allowNull: false
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: true
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

User.hasMany(Collection, {
  foreignKey: 'user_id',
});
Collection.belongsTo(User);

// Collection.associate = (models) => {
//   Collection.belongsTo(models.User, {
//     foreignKey: 'user_id',
//     as: 'user',
//   });
// };

module.exports = Collection;
