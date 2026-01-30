const express = require('express');
const { Outfit, Product } = require('../models');
const { authMiddleware } = require('../middleware/auth');
const { generateOutfit } = require('../utils/ai');

const router = express.Router();

// Generate AI outfit for a product
router.post('/generate', authMiddleware, async (req, res) => {
  try {
    const { productId, style = 'street' } = req.body;

    if (!productId) {
      return res.status(400).json({ error: 'Product ID is required' });
    }

    // Check if product exists
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Check user's Pro status for unlimited generations
    const { User } = require('../models');
    const user = await User.findByPk(req.userId);
    
    if (!user.isPro) {
      // Check generation limit for free users (e.g., 3 per day)
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const todaysOutfits = await Outfit.count({
        where: {
          userId: req.userId,
          createdAt: {
            [Op.gte]: today
          }
        }
      });
      
      if (todaysOutfits >= 3) {
        return res.status(403).json({ 
          error: 'Daily outfit generation limit reached. Upgrade to Pro for unlimited generations.' 
        });
      }
    }

    // Generate outfit using AI
    const generatedOutfit = await generateOutfit(product, style);

    // Save generated outfit
    const outfit = await Outfit.create({
      userId: req.userId,
      name: generatedOutfit.name,
      description: generatedOutfit.description,
      items: generatedOutfit.items,
      style: style,
      basedOnProductId: productId
    });

    res.status(201).json({
      message: 'Outfit generated successfully',
      outfit: {
        id: outfit.id,
        name: outfit.name,
        description: outfit.description,
        items: outfit.items,
        style: outfit.style,
        basedOnProductId: outfit.basedOnProductId
      }
    });
  } catch (error) {
    console.error('Outfit generation error:', error);
    res.status(500).json({ error: 'Failed to generate outfit' });
  }
});

// Get user's outfits
router.get('/my-outfits', authMiddleware, async (req, res) => {
  try {
    const { page = 1, limit = 20, style } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = { userId: req.userId };
    if (style) whereClause.style = style;

    const { count, rows } = await Outfit.findAndCountAll({
      where: whereClause,
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset
    });

    res.json({
      outfits: rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count,
        pages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    console.error('Outfits fetch error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get public outfits (for explore feed)
router.get('/explore', async (req, res) => {
  try {
    const { page = 1, limit = 20, style } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = { isPublic: true };
    if (style) whereClause.style = style;

    const { count, rows } = await Outfit.findAndCountAll({
      where: whereClause,
      include: [{
        model: require('../models').User,
        as: 'user',
        attributes: ['id', 'name', 'avatar']
      }],
      order: [['likes', 'DESC'], ['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset
    });

    res.json({
      outfits: rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count,
        pages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    console.error('Explore outfits fetch error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single outfit
router.get('/:id', async (req, res) => {
  try {
    const outfit = await Outfit.findByPk(req.params.id, {
      include: [
        {
          model: require('../models').User,
          as: 'user',
          attributes: ['id', 'name', 'avatar']
        },
        {
          model: Product,
          as: 'basedOnProduct',
          attributes: ['id', 'name', 'brand', 'image', 'price']
        }
      ]
    });

    if (!outfit) {
      return res.status(404).json({ error: 'Outfit not found' });
    }

    res.json({ outfit });
  } catch (error) {
    console.error('Outfit fetch error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update outfit
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { name, description, isPublic } = req.body;
    
    const outfit = await Outfit.findOne({
      where: { id: req.params.id, userId: req.userId }
    });

    if (!outfit) {
      return res.status(404).json({ error: 'Outfit not found' });
    }

    await outfit.update({
      name: name || outfit.name,
      description: description !== undefined ? description : outfit.description,
      isPublic: isPublic !== undefined ? isPublic : outfit.isPublic
    });

    res.json({
      message: 'Outfit updated successfully',
      outfit
    });
  } catch (error) {
    console.error('Outfit update error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete outfit
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const outfit = await Outfit.findOne({
      where: { id: req.params.id, userId: req.userId }
    });

    if (!outfit) {
      return res.status(404).json({ error: 'Outfit not found' });
    }

    await outfit.destroy();

    res.json({ message: 'Outfit deleted successfully' });
  } catch (error) {
    console.error('Outfit delete error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Like/unlike outfit
router.post('/:id/like', authMiddleware, async (req, res) => {
  try {
    const outfit = await Outfit.findByPk(req.params.id);
    
    if (!outfit) {
      return res.status(404).json({ error: 'Outfit not found' });
    }

    await outfit.increment('likes');

    res.json({ message: 'Outfit liked successfully' });
  } catch (error) {
    console.error('Like outfit error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
