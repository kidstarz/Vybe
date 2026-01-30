const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const SavedItem = sequelize.define('SavedItem', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Products',
        key: 'id'
      }
    },
    folder: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'default'
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  });

  return SavedItem;
};
