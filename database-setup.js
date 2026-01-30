const { sequelize } = require('./models');
const { User, Product, SavedItem, Outfit, Review } = require('./models');

async function setupDatabase() {
  try {
    console.log('Setting up Vybe database...');
    
    // Sync all models
    await sequelize.sync({ force: true });
    console.log('Database synced successfully.');
    
    // Insert sample products
    await insertSampleProducts();
    console.log('Sample products inserted successfully.');
    
    console.log('Database setup complete!');
    process.exit(0);
  } catch (error) {
    console.error('Database setup error:', error);
    process.exit(1);
  }
}

async function insertSampleProducts() {
  const products = [
    // Clothing
    {
      name: 'Boxy Fit Graphic Hoodie',
      brand: 'Essentials',
      price: 89.00,
      originalPrice: 120.00,
      category: 'clothing',
      gender: 'men',
      isNew: true,
      rating: 4.8,
      reviewCount: 234,
      images: ['/clothing-hoodie.jpg'],
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Black', 'Grey', 'Navy'],
      tags: ['hoodie', 'streetwear', 'oversized'],
      affiliateLinks: {
        amazon: 'https://amazon.com/product1',
        asos: 'https://asos.com/product1'
      }
    },
    {
      name: 'Premium Cotton Tee',
      brand: 'ASOS Design',
      price: 25.00,
      category: 'clothing',
      gender: 'men',
      rating: 4.6,
      reviewCount: 512,
      images: ['/clothing-tee-white.jpg'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['White', 'Black', 'Grey'],
      tags: ['tshirt', 'basics', 'cotton'],
      affiliateLinks: {
        asos: 'https://asos.com/product2'
      }
    },
    {
      name: 'Tech Cargo Pants',
      brand: 'Nike ACG',
      price: 145.00,
      category: 'clothing',
      gender: 'men',
      isNew: true,
      rating: 4.9,
      reviewCount: 189,
      images: ['/clothing-cargo.jpg'],
      sizes: ['28', '30', '32', '34', '36', '38'],
      colors: ['Black', 'Olive', 'Navy'],
      tags: ['cargo', 'techwear', 'pants'],
      affiliateLinks: {
        nike: 'https://nike.com/product3',
        amazon: 'https://amazon.com/product3'
      }
    },
    
    // Trainers
    {
      name: 'Air Jordan 1 Retro High OG',
      brand: 'Nike',
      price: 180.00,
      category: 'trainers',
      gender: 'men',
      isNew: true,
      rating: 4.9,
      reviewCount: 1024,
      images: ['/product-jordan.jpg'],
      sizes: ['7', '8', '9', '10', '11', '12'],
      colors: ['Chicago', 'Bred', 'Royal'],
      tags: ['jordan', 'basketball', 'retro'],
      affiliateLinks: {
        nike: 'https://nike.com/jordan1',
        stockx: 'https://stockx.com/jordan1'
      }
    },
    {
      name: 'Yeezy Boost 350 V2',
      brand: 'Adidas',
      price: 220.00,
      category: 'trainers',
      gender: 'unisex',
      rating: 4.7,
      reviewCount: 876,
      images: ['/product-yeezy.jpg'],
      sizes: ['7', '8', '9', '10', '11', '12'],
      colors: ['Zebra', 'Beluga', 'Cream'],
      tags: ['yeezy', 'boost', 'kanye'],
      affiliateLinks: {
        adidas: 'https://adidas.com/yeezy',
        stockx: 'https://stockx.com/yeezy'
      }
    },
    {
      name: 'Air Jordan 4 Retro',
      brand: 'Nike',
      price: 210.00,
      category: 'trainers',
      gender: 'men',
      isNew: true,
      rating: 4.8,
      reviewCount: 567,
      images: ['/trainer-jordan4.jpg'],
      sizes: ['7', '8', '9', '10', '11', '12'],
      colors: ['Fire Red', 'Military Blue', 'White Cement'],
      tags: ['jordan', 'retro', 'classic'],
      affiliateLinks: {
        nike: 'https://nike.com/jordan4'
      }
    },
    {
      name: 'Air Max 90',
      brand: 'Nike',
      price: 130.00,
      originalPrice: 150.00,
      category: 'trainers',
      gender: 'unisex',
      isSale: true,
      rating: 4.6,
      reviewCount: 1234,
      images: ['/trainer-airmax.jpg'],
      sizes: ['7', '8', '9', '10', '11', '12'],
      colors: ['Infrared', 'White', 'Black'],
      tags: ['airmax', 'classic', 'visible-air'],
      affiliateLinks: {
        nike: 'https://nike.com/airmax90'
      }
    },
    {
      name: '550',
      brand: 'New Balance',
      price: 120.00,
      category: 'trainers',
      gender: 'unisex',
      isNew: true,
      rating: 4.8,
      reviewCount: 445,
      images: ['/product-nb.jpg'],
      sizes: ['7', '8', '9', '10', '11', '12'],
      colors: ['White/Green', 'Black', 'Grey'],
      tags: ['newbalance', '550', 'retro'],
      affiliateLinks: {
        newbalance: 'https://newbalance.com/550'
      }
    },
    {
      name: 'Suede Classic',
      brand: 'Puma',
      price: 75.00,
      category: 'trainers',
      gender: 'unisex',
      rating: 4.5,
      reviewCount: 289,
      images: ['/trainer-puma.jpg'],
      sizes: ['7', '8', '9', '10', '11', '12'],
      colors: ['Black', 'Blue', 'Red'],
      tags: ['puma', 'suede', 'classic'],
      affiliateLinks: {
        puma: 'https://puma.com/suede'
      }
    },
    {
      name: 'Club C 85',
      brand: 'Reebok',
      price: 85.00,
      category: 'trainers',
      gender: 'unisex',
      rating: 4.4,
      reviewCount: 378,
      images: ['/trainer-reebok.jpg'],
      sizes: ['7', '8', '9', '10', '11', '12'],
      colors: ['White', 'Black', 'Chalk'],
      tags: ['reebok', 'clubc', 'tennis'],
      affiliateLinks: {
        reebok: 'https://reebok.com/clubc'
      }
    },
    {
      name: 'Chuck Taylor High',
      brand: 'Converse',
      price: 65.00,
      originalPrice: 80.00,
      category: 'trainers',
      gender: 'unisex',
      isSale: true,
      rating: 4.7,
      reviewCount: 892,
      images: ['/trainer-converse.jpg'],
      sizes: ['7', '8', '9', '10', '11', '12'],
      colors: ['Black', 'White', 'Red'],
      tags: ['converse', 'chuck', 'high-top'],
      affiliateLinks: {
        converse: 'https://converse.com/chuck'
      }
    },
    
    // Accessories
    {
      name: 'Utility Crossbody Bag',
      brand: 'Carhartt WIP',
      price: 89.00,
      category: 'accessories',
      gender: 'unisex',
      isNew: true,
      rating: 4.6,
      reviewCount: 156,
      images: ['/accessory-bag.jpg'],
      colors: ['Brown', 'Black', 'Olive'],
      tags: ['bag', 'crossbody', 'utility'],
      affiliateLinks: {
        carhartt: 'https://carhartt.com/bag'
      }
    },
    {
      name: 'Silver Cross Chain',
      brand: 'Vivienne Westwood',
      price: 195.00,
      category: 'accessories',
      gender: 'unisex',
      rating: 4.9,
      reviewCount: 67,
      images: ['/accessory-chain.jpg'],
      colors: ['Silver'],
      tags: ['jewelry', 'chain', 'luxury'],
      affiliateLinks: {
        vivienne: 'https://viviennewestwood.com/chain'
      }
    },
    {
      name: 'Logo Bucket Hat',
      brand: 'Palace',
      price: 55.00,
      category: 'accessories',
      gender: 'unisex',
      isNew: true,
      rating: 4.7,
      reviewCount: 234,
      images: ['/accessory-hat.jpg'],
      colors: ['Black', 'White', 'Navy'],
      tags: ['hat', 'bucket', 'streetwear'],
      affiliateLinks: {
        palace: 'https://palaceskateboards.com/hat'
      }
    }
  ];

  for (const product of products) {
    await Product.create(product);
  }
}

// Run setup
setupDatabase();
