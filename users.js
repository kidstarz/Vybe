const express = require('express');
const { SavedItem, Product } = require('../models');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Get user's saved items
router.get('/saved-items', authMiddleware, async (req, res) => {
  try {
    const { page = 1, limit = 20, folder } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = { userId: req.userId };
    if (folder) whereClause.folder = folder;

    const { count, rows } = await SavedItem.findAndCountAll({
      where: whereClause,
      include: [{
        model: Product,
        as: 'product'
      }],
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset
    });

    res.json({
      savedItems: rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count,
        pages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    console.error('Saved items fetch error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Save a product
router.post('/saved-items', authMiddleware, async (req, res) => {
  try {
    const { productId, folder = 'default', notes } = req.body;

    if (!productId) {
      return res.status(400).json({ error: 'Product ID is required' });
    }

    // Check if already saved
    const existing = await SavedItem.findOne({
      where: { userId: req.userId, productId }
    });

    if (existing) {
      return res.status(409).json({ error: 'Product already saved' });
    }

    const savedItem = await SavedItem.create({
      userId: req.userId,
      productId,
      folder,
      notes
    });

    const savedItemWithProduct = await SavedItem.findByPk(savedItem.id, {
      include: [{
        model: Product,
        as: 'product'
      }]
    });

    res.status(201).json({
      message: 'Product saved successfully',
      savedItem: savedItemWithProduct
    });
  } catch (error) {
    console.error('Save product error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Remove a saved product
router.delete('/saved-items/:id', authMiddleware, async (req, res) => {
  try {
    const savedItem = await SavedItem.findOne({
      where: { 
        id: req.params.id, 
        userId: req.userId 
      }
    });

    if (!savedItem) {
      return res.status(404).json({ error: 'Saved item not found' });
    }

    await savedItem.destroy();

    res.json({ message: 'Product removed from saved items' });
  } catch (error) {
    console.error('Remove saved item error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get saved items folders
router.get('/saved-items/folders', authMiddleware, async (req, res) => {
  try {
    const folders = await SavedItem.findAll({
      where: { userId: req.userId },
      attributes: ['folder'],
      group: ['folder'],
      order: [['folder', 'ASC']]
    });

    res.json({ 
      folders: folders.map(f => f.folder),
      counts: {} // You can add count per folder here
    });
  } catch (error) {
    console.error('Folders fetch error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user statistics
router.get('/stats', authMiddleware, async (req, res) => {
  try {
    const savedItemsCount = await SavedItem.count({
      where: { userId: req.userId }
    });

    const { Outfit } = require('../models');
    const outfitsCount = await Outfit.count({
      where: { userId: req.userId }
    });

    res.json({
      savedItems: savedItemsCount,
      outfitsCreated: outfitsCount
    });
  } catch (error) {
    console.error('Stats fetch error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
