const axios = require('axios');
const { Op } = require('sequelize');
const { Product } = require('../models');

// Generate outfit using OpenAI GPT-4 Vision
async function generateOutfit(baseProduct, style = 'street') {
  try {
    // If OpenAI API key is not configured, return mock data
    if (!process.env.OPENAI_API_KEY) {
      return getMockOutfit(baseProduct, style);
    }

    const prompt = generatePrompt(baseProduct, style);
    
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4-vision-preview',
        messages: [
          {
            role: 'system',
            content: 'You are a professional fashion stylist. Generate complete outfit recommendations based on the provided product.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 1000,
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const aiResponse = response.data.choices[0].message.content;
    return parseAIResponse(aiResponse, baseProduct);
  } catch (error) {
    console.error('AI generation error:', error.response?.data || error.message);
    // Return mock data if AI fails
    return getMockOutfit(baseProduct, style);
  }
}

function generatePrompt(product, style) {
  const styleDescriptions = {
    street: 'casual streetwear with bold statement pieces',
    smart: 'elevated everyday look with premium touches',
    statement: 'bold and confident with vintage influences',
    minimal: 'clean and minimal aesthetic',
    vintage: 'retro-inspired with modern touches'
  };

  return `
Generate a complete outfit based on this ${product.category}: ${product.name} by ${product.brand}.

Style preference: ${styleDescriptions[style] || styleDescriptions.street}

Provide the response in this exact JSON format:
{
  "name": "Outfit name",
  "description": "Brief description of the look",
  "items": [
    {
      "name": "Item name",
      "category": "category",
      "price": estimated_price
    }
  ]
}

Include 4-5 items that complement the base product. Estimate realistic prices for each item.
`;
}

function parseAIResponse(response, baseProduct) {
  try {
    // Try to extract JSON from the response
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      
      // Add the base product to the items
      const items = [
        {
          name: baseProduct.name,
          price: parseFloat(baseProduct.price)
        },
        ...parsed.items.map(item => ({
          name: item.name,
          price: parseFloat(item.price) || 50
        }))
      ];
      
      return {
        name: parsed.name || `${styleToName(parsed.style || 'street')} Look`,
        description: parsed.description || 'AI generated outfit',
        items: items.slice(0, 5) // Max 5 items
      };
    }
  } catch (error) {
    console.error('JSON parsing error:', error);
  }
  
  // Return mock data if parsing fails
  return getMockOutfit(baseProduct, 'street');
}

function getMockOutfit(product, style) {
  const outfitTemplates = {
    street: {
      name: 'Street Vibes',
      description: 'Casual streetwear with bold statement pieces',
      items: [
        { name: product.name, price: parseFloat(product.price) },
        { name: 'Black Cargo Pants', price: 85 },
        { name: 'Oversized Graphic Hoodie', price: 65 },
        { name: 'Silver Chain Necklace', price: 45 }
      ]
    },
    smart: {
      name: 'Smart Casual',
      description: 'Elevated everyday look with premium touches',
      items: [
        { name: product.name, price: parseFloat(product.price) },
        { name: 'Slim Black Jeans', price: 95 },
        { name: 'White Oversized Tee', price: 35 },
        { name: 'Black Bomber Jacket', price: 120 }
      ]
    },
    statement: {
      name: 'Statement Piece',
      description: 'Bold and confident with vintage influences',
      items: [
        { name: product.name, price: parseFloat(product.price) },
        { name: 'Distressed Denim Jeans', price: 75 },
        { name: 'Vintage Band Tee', price: 55 },
        { name: 'Oversized Leather Jacket', price: 250 },
        { name: 'Gold Chains', price: 80 }
      ]
    },
    minimal: {
      name: 'Minimal Aesthetic',
      description: 'Clean and minimal with neutral tones',
      items: [
        { name: product.name, price: parseFloat(product.price) },
        { name: 'White T-Shirt', price: 30 },
        { name: 'Black Trousers', price: 80 },
        { name: 'Minimal Watch', price: 150 }
      ]
    },
    vintage: {
      name: 'Vintage Revival',
      description: 'Retro-inspired with modern touches',
      items: [
        { name: product.name, price: parseFloat(product.price) },
        { name: 'Vintage Wash Jeans', price: 90 },
        { name: 'Retro Windbreaker', price: 120 },
        { name: 'Vintage Cap', price: 35 }
      ]
    }
  };

  return outfitTemplates[style] || outfitTemplates.street;
}

function styleToName(style) {
  const names = {
    street: 'Street',
    smart: 'Smart',
    statement: 'Statement',
    minimal: 'Minimal',
    vintage: 'Vintage'
  };
  return names[style] || 'Street';
}

// Get similar products for outfit recommendations
async function getSimilarProducts(product, limit = 10) {
  try {
    const similarProducts = await Product.findAll({
      where: {
        id: { [Op.ne]: product.id },
        category: { [Op.ne]: product.category },
        [Op.or]: [
          { brand: product.brand },
          { tags: { [Op.contains]: product.tags || [] } }
        ]
      },
      limit,
      order: [['rating', 'DESC']]
    });

    return similarProducts;
  } catch (error) {
    console.error('Similar products error:', error);
    return [];
  }
}

module.exports = {
  generateOutfit,
  getSimilarProducts
};
