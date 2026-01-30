const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Outfit = sequelize.define('Outfit', {
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
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    items: {
      type: DataTypes.JSONB,
      defaultValue: []
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    style: {
      type: DataTypes.ENUM('street', 'smart', 'statement', 'minimal', 'vintage'),
      allowNull: false
    },
    isPublic: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    basedOnProductId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Products',
        key: 'id'
      }
    }
  });

  return Outfit;
};
