const express = require('express');
const { Op } = require('sequelize');
const { Product, Review } = require('../models');
const { authMiddleware, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// Get all products with filtering and pagination
router.get('/', optionalAuth, async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      category, 
      brand, 
      search,
      sortBy = 'createdAt',
      sortOrder = 'DESC',
      minPrice,
      maxPrice,
      isNew,
      isSale
    } = req.query;

    const offset = (page - 1) * limit;
    
    // Build where clause
    const whereClause = {};
    
    if (category) whereClause.category = category;
    if (brand) whereClause.brand = { [Op.iLike]: `%${brand}%` };
    if (isNew === 'true') whereClause.isNew = true;
    if (isSale === 'true') whereClause.isSale = true;
    
    if (search) {
      whereClause[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { brand: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } }
      ];
    }
    
    if (minPrice || maxPrice) {
      whereClause.price = {};
      if (minPrice) whereClause.price[Op.gte] = parseFloat(minPrice);
      if (maxPrice) whereClause.price[Op.lte] = parseFloat(maxPrice);
    }

    const { count, rows } = await Product.findAndCountAll({
      where: whereClause,
      order: [[sortBy, sortOrder]],
      limit: parseInt(limit),
      offset,
      include: [{
        model: Review,
        as: 'reviews',
        attributes: ['rating']
      }]
    });

    // Calculate average rating for each product
    const productsWithStats = rows.map(product => {
      const productJSON = product.toJSON();
      if (productJSON.reviews && productJSON.reviews.length > 0) {
        const sum = productJSON.reviews.reduce((acc, review) => acc + review.rating, 0);
        productJSON.rating = (sum / productJSON.reviews.length).toFixed(1);
        productJSON.reviewCount = productJSON.reviews.length;
      } else {
        productJSON.rating = 0;
        productJSON.reviewCount = 0;
      }
      delete productJSON.reviews;
      return productJSON;
    });

    res.json({
      products: productsWithStats,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count,
        pages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    console.error('Products fetch error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single product by ID
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{
        model: Review,
        as: 'reviews',
        include: [{
          model: require('../models').User,
          as: 'user',
          attributes: ['id', 'name', 'avatar']
        }]
      }]
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const productJSON = product.toJSON();
    
    // Calculate average rating
    if (productJSON.reviews && productJSON.reviews.length > 0) {
      const sum = productJSON.reviews.reduce((acc, review) => acc + review.rating, 0);
      productJSON.rating = (sum / productJSON.reviews.length).toFixed(1);
      productJSON.reviewCount = productJSON.reviews.length;
    } else {
      productJSON.rating = 0;
      productJSON.reviewCount = 0;
    }

    res.json({ product: productJSON });
  } catch (error) {
    console.error('Product fetch error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get new products
router.get('/featured/new', async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    
    const products = await Product.findAll({
      where: { isNew: true },
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit)
    });

    res.json({ products });
  } catch (error) {
    console.error('New products fetch error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get sale products
router.get('/featured/sale', async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    
    const products = await Product.findAll({
      where: { isSale: true },
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit)
    });

    res.json({ products });
  } catch (error) {
    console.error('Sale products fetch error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get products by category
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const { page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    const validCategories = ['clothing', 'trainers', 'accessories'];
    if (!validCategories.includes(category)) {
      return res.status(400).json({ error: 'Invalid category' });
    }

    const { count, rows } = await Product.findAndCountAll({
      where: { category },
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset
    });

    res.json({
      products: rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count,
        pages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    console.error('Category products fetch error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get brands list
router.get('/filters/brands', async (req, res) => {
  try {
    const brands = await Product.findAll({
      attributes: ['brand'],
      group: ['brand'],
      order: [['brand', 'ASC']]
    });

    res.json({ brands: brands.map(p => p.brand) });
  } catch (error) {
    console.error('Brands fetch error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get price range
router.get('/filters/price-range', async (req, res) => {
  try {
    const { category } = req.query;
    
    const whereClause = {};
    if (category) whereClause.category = category;
    
    const result = await Product.findOne({
      where: whereClause,
      attributes: [
        [sequelize.fn('MIN', sequelize.col('price')), 'minPrice'],
        [sequelize.fn('MAX', sequelize.col('price')), 'maxPrice']
      ]
    });

    res.json({
      minPrice: result.get('minPrice') || 0,
      maxPrice: result.get('maxPrice') || 0
    });
  } catch (error) {
    console.error('Price range fetch error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Search products
router.get('/search/:query', async (req, res) => {
  try {
    const { query } = req.params;
    const { page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    const { count, rows } = await Product.findAndCountAll({
      where: {
        [Op.or]: [
          { name: { [Op.iLike]: `%${query}%` } },
          { brand: { [Op.iLike]: `%${query}%` } },
          { description: { [Op.iLike]: `%${query}%` } }
        ]
      },
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset
    });

    res.json({
      products: rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count,
        pages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get affiliate links for a product
router.get('/:id/affiliate-links', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      attributes: ['id', 'name', 'affiliateLinks']
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({
      productId: product.id,
      productName: product.name,
      affiliateLinks: product.affiliateLinks || {}
    });
  } catch (error) {
    console.error('Affiliate links fetch error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
