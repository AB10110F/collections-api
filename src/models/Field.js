const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Collection = require('./Collection');

const Field = sequelize.define('Field', {
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
  field_type: {
    type: DataTypes.ENUM('Text', 'Number', 'Multiline', 'Checkbox', 'Date'),
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

Collection.hasMany(Field, {
  foreignKey: 'collection_id',
});
Field.belongsTo(Collection);

module.exports = Field;
