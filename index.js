const { Sequelize } = require('sequelize');

// Initialize Sequelize
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  username: process.env.DB_USER || 'vybe_user',
  password: process.env.DB_PASSWORD || 'vybe_password',
  database: process.env.DB_NAME || 'vybe_db',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// Import models
const User = require('./User')(sequelize, Sequelize.DataTypes);
const Product = require('./Product')(sequelize, Sequelize.DataTypes);
const SavedItem = require('./SavedItem')(sequelize, Sequelize.DataTypes);
const Outfit = require('./Outfit')(sequelize, Sequelize.DataTypes);
const Review = require('./Review')(sequelize, Sequelize.DataTypes);

// Define associations
User.hasMany(SavedItem, { foreignKey: 'userId', as: 'savedItems' });
SavedItem.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Product.hasMany(SavedItem, { foreignKey: 'productId', as: 'savedBy' });
SavedItem.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

User.hasMany(Outfit, { foreignKey: 'userId', as: 'outfits' });
Outfit.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Product.hasMany(Review, { foreignKey: 'productId', as: 'reviews' });
Review.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

User.hasMany(Review, { foreignKey: 'userId', as: 'userReviews' });
Review.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = {
  sequelize,
  User,
  Product,
  SavedItem,
  Outfit,
  Review
};
