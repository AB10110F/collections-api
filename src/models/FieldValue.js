const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Field = require('./Field');
const Item = require('./Item');

const FieldValue = sequelize.define('FieldValue', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  field_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Field,
      key: 'id'
    }
  },
  item_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Field,
      key: 'id'
    }
  },
  value: {
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

Field.hasMany(FieldValue, {
  foreignKey: 'field_id',
});
FieldValue.belongsTo(Field);

Item.hasMany(FieldValue, {
  foreignKey: 'item_id',
});
FieldValue.belongsTo(Item);

module.exports = FieldValue;
