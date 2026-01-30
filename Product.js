const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    originalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    images: {
      type: DataTypes.JSONB,
      defaultValue: []
    },
    category: {
      type: DataTypes.ENUM('clothing', 'trainers', 'accessories'),
      allowNull: false
    },
    gender: {
      type: DataTypes.ENUM('men', 'women', 'unisex'),
      allowNull: false,
      defaultValue: 'unisex'
    },
    isNew: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isSale: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    rating: {
      type: DataTypes.DECIMAL(3, 2),
      defaultValue: 0.00
    },
    reviewCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    affiliateLinks: {
      type: DataTypes.JSONB,
      defaultValue: {}
    },
    sizes: {
      type: DataTypes.JSONB,
      defaultValue: []
    },
    colors: {
      type: DataTypes.JSONB,
      defaultValue: []
    },
    tags: {
      type: DataTypes.JSONB,
      defaultValue: []
    }
  });

  return Product;
};
