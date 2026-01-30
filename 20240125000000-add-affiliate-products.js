module.exports = {
  up: async (queryInterface, Sequelize) => {
    const products = [
      // CLOTHING
      {
        id: 'c1',
        name: 'Boxy Fit Graphic Hoodie',
        brand: 'Essentials',
        description: 'Premium heavyweight hoodie with relaxed fit and bold graphic print',
        price: 89.00,
        originalPrice: 120.00,
        images: ['/clothing-hoodie.jpg'],
        category: 'clothing',
        gender: 'unisex',
        isNew: true,
        isSale: true,
        rating: 4.80,
        reviewCount: 234,
        affiliateLinks: {
          amazon: 'https://amazon.com/dp/B08XYZ1234',
          asos: 'https://www.asos.com/essentials/essentials-boxy-fit-graphic-hoodie/prd/123456',
          farfetch: 'https://www.farfetch.com/shopping/men/essentials-boxy-fit-graphic-hoodie-item-123456.aspx'
        },
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Black', 'Navy', 'Grey', 'White'],
        tags: ['hoodie', 'graphic', 'streetwear', 'essentials']
      },
      {
        id: 'c2',
        name: 'Premium Cotton Tee',
        brand: 'ASOS Design',
        description: 'Soft-touch organic cotton t-shirt in relaxed fit',
        price: 25.00,
        images: ['/clothing-tee-white.jpg'],
        category: 'clothing',
        gender: 'unisex',
        isNew: false,
        isSale: false,
        rating: 4.60,
        reviewCount: 512,
        affiliateLinks: {
          asos: 'https://www.asos.com/asos-design/asos-design-premium-cotton-tee/prd/234567',
          amazon: 'https://amazon.com/dp/B08ABC5678'
        },
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        colors: ['White', 'Black', 'Grey', 'Navy'],
        tags: ['tshirt', 'cotton', 'basics', 'asos']
      },
      {
        id: 'c3',
        name: 'Tech Cargo Pants',
        brand: 'Nike ACG',
        description: 'Water-resistant cargo pants with multiple pockets and adjustable cuffs',
        price: 145.00,
        images: ['/clothing-cargo.jpg'],
        category: 'clothing',
        gender: 'men',
        isNew: true,
        isSale: false,
        rating: 4.90,
        reviewCount: 189,
        affiliateLinks: {
          amazon: 'https://amazon.com/dp/B08DEF9012',
          stockx: 'https://stockx.com/nike-acg-tech-cargo-pants',
          goat: 'https://goat.com/sneakers/acg-tech-cargo-pants'
        },
        sizes: ['28', '30', '32', '34', '36', '38'],
        colors: ['Black', 'Olive', 'Khaki'],
        tags: ['cargo', 'pants', 'acg', 'nike', 'techwear']
      },
      {
        id: 'c4',
        name: 'Oversized Denim Jacket',
        brand: 'Levi\'s',
        description: 'Classic trucker jacket in oversized fit with vintage wash',
        price: 98.00,
        originalPrice: 128.00,
        images: ['/clothing-denim-jacket.jpg'],
        category: 'clothing',
        gender: 'unisex',
        isNew: false,
        isSale: true,
        rating: 4.70,
        reviewCount: 423,
        affiliateLinks: {
          amazon: 'https://amazon.com/dp/B08GHI3456',
          asos: 'https://www.asos.com/levis/levis-oversized-denim-jacket/prd/345678',
          farfetch: 'https://www.farfetch.com/shopping/men/levis-oversized-denim-jacket-item-345678.aspx'
        },
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        colors: ['Light Blue', 'Medium Blue', 'Black'],
        tags: ['denim', 'jacket', 'levis', 'vintage']
      },

      // TRAINERS
      {
        id: 't1',
        name: 'Air Jordan 1 Retro High OG',
        brand: 'Nike',
        description: 'Classic high-top basketball shoe in iconic colorways',
        price: 180.00,
        images: ['/product-jordan.jpg'],
        category: 'trainers',
        gender: 'men',
        isNew: true,
        isSale: false,
        rating: 4.90,
        reviewCount: 1024,
        affiliateLinks: {
          stockx: 'https://stockx.com/air-jordan-1-retro-high-og-chicago',
          goat: 'https://goat.com/sneakers/air-jordan-1-retro-high-og-chicago',
          farfetch: 'https://www.farfetch.com/shopping/men/nike-air-jordan-1-retro-high-og-item-456789.aspx'
        },
        sizes: ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '12'],
        colors: ['Chicago', 'Bred', 'Royal'],
        tags: ['jordan', 'basketball', 'retro', 'high-top']
      },
      {
        id: 't2',
        name: 'Yeezy Boost 350 V2',
        brand: 'Adidas',
        description: 'Primeknit upper with Boost cushioning in iconic silhouette',
        price: 220.00,
        images: ['/product-yeezy.jpg'],
        category: 'trainers',
        gender: 'unisex',
        isNew: false,
        isSale: false,
        rating: 4.70,
        reviewCount: 876,
        affiliateLinks: {
          stockx: 'https://stockx.com/adidas-yeezy-boost-350-v2',
          goat: 'https://goat.com/sneakers/adidas-yeezy-boost-350-v2',
          amazon: 'https://amazon.com/dp/B08YZY1234'
        },
        sizes: ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '12', '13'],
        colors: ['Zebra', 'Beluga', 'Cream White'],
        tags: ['yeezy', 'boost', 'kanye', 'primeknit']
      },
      {
        id: 't3',
        name: 'Air Jordan 4 Retro',
        brand: 'Nike',
        description: 'Classic basketball shoe with visible Air unit and mesh panels',
        price: 210.00,
        images: ['/trainer-jordan4.jpg'],
        category: 'trainers',
        gender: 'men',
        isNew: true,
        isSale: false,
        rating: 4.80,
        reviewCount: 567,
        affiliateLinks: {
          stockx: 'https://stockx.com/air-jordan-4-retro-bred',
          goat: 'https://goat.com/sneakers/air-jordan-4-retro-bred',
          amazon: 'https://amazon.com/dp/B08JKL5678'
        },
        sizes: ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '12'],
        colors: ['Bred', 'Fire Red', 'Military Blue'],
        tags: ['jordan', 'retro', 'basketball', '4s']
      },
      {
        id: 't4',
        name: 'Air Max 90',
        brand: 'Nike',
        description: 'Iconic Air Max model with visible Air unit and classic design',
        price: 130.00,
        originalPrice: 150.00,
        images: ['/trainer-airmax.jpg'],
        category: 'trainers',
        gender: 'unisex',
        isNew: false,
        isSale: true,
        rating: 4.60,
        reviewCount: 1234,
        affiliateLinks: {
          amazon: 'https://amazon.com/dp/B08MNO9012',
          asos: 'https://www.asos.com/nike/nike-air-max-90/prd/567890'
        },
        sizes: ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '12'],
        colors: ['Infrared', 'White', 'Black'],
        tags: ['air max', '90', 'running', 'classic']
      },
      {
        id: 't5',
        name: '550',
        brand: 'New Balance',
        description: 'Vintage basketball shoe with premium leather construction',
        price: 120.00,
        images: ['/product-nb.jpg'],
        category: 'trainers',
        gender: 'unisex',
        isNew: true,
        isSale: false,
        rating: 4.80,
        reviewCount: 445,
        affiliateLinks: {
          amazon: 'https://amazon.com/dp/B08PQR2345',
          stockx: 'https://stockx.com/new-balance-550'
        },
        sizes: ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '12'],
        colors: ['White/Green', 'White/Grey', 'Black'],
        tags: ['new balance', '550', 'vintage', 'basketball']
      },
      {
        id: 't6',
        name: 'Suede Classic',
        brand: 'Puma',
        description: 'Classic suede sneaker with iconic formstripe design',
        price: 75.00,
        images: ['/trainer-puma.jpg'],
        category: 'trainers',
        gender: 'unisex',
        isNew: false,
        isSale: false,
        rating: 4.50,
        reviewCount: 289,
        affiliateLinks: {
          amazon: 'https://amazon.com/dp/B08STU6789',
          asos: 'https://www.asos.com/puma/puma-suede-classic/prd/678901'
        },
        sizes: ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '12'],
        colors: ['Black', 'Navy', 'Burgundy'],
        tags: ['puma', 'suede', 'classic', 'retro']
      },
      {
        id: 't7',
        name: 'Club C 85',
        brand: 'Reebok',
        description: 'Classic tennis shoe with soft leather upper and vintage styling',
        price: 85.00,
        images: ['/trainer-reebok.jpg'],
        category: 'trainers',
        gender: 'unisex',
        isNew: false,
        isSale: false,
        rating: 4.40,
        reviewCount: 378,
        affiliateLinks: {
          amazon: 'https://amazon.com/dp/B08VWX3456',
          asos: 'https://www.asos.com/reebok/reebok-club-c-85/prd/789012'
        },
        sizes: ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '12'],
        colors: ['White', 'Black', 'Chalk'],
        tags: ['reebok', 'club c', 'tennis', 'vintage']
      },
      {
        id: 't8',
        name: 'Chuck Taylor High',
        brand: 'Converse',
        description: 'Iconic high-top canvas sneaker with rubber toe cap',
        price: 65.00,
        originalPrice: 80.00,
        images: ['/trainer-converse.jpg'],
        category: 'trainers',
        gender: 'unisex',
        isNew: false,
        isSale: true,
        rating: 4.70,
        reviewCount: 892,
        affiliateLinks: {
          amazon: 'https://amazon.com/dp/B08XYZ8901',
          asos: 'https://www.asos.com/converse/converse-chuck-taylor-high/prd/890123'
        },
        sizes: ['6', '7', '8', '9', '10', '11', '12', '13'],
        colors: ['Black', 'White', 'Red', 'Navy'],
        tags: ['converse', 'chuck taylor', 'high top', 'canvas']
      },
      {
        id: 't9',
        name: 'Dunk Low',
        brand: 'Nike',
        description: 'Classic basketball shoe with low-top design and premium materials',
        price: 110.00,
        images: ['/trainer-dunk-low.jpg'],
        category: 'trainers',
        gender: 'unisex',
        isNew: true,
        isSale: false,
        rating: 4.60,
        reviewCount: 789,
        affiliateLinks: {
          stockx: 'https://stockx.com/nike-dunk-low-panda',
          goat: 'https://goat.com/sneakers/nike-dunk-low-panda',
          amazon: 'https://amazon.com/dp/B08ABC1234'
        },
        sizes: ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '12'],
        colors: ['Panda', 'Kentucky', 'Syracuse'],
        tags: ['dunk', 'low', 'basketball', 'skate']
      },
      {
        id: 't10',
        name: 'Old Skool',
        brand: 'Vans',
        description: 'Classic skate shoe with signature side stripe',
        price: 70.00,
        images: ['/trainer-vans.jpg'],
        category: 'trainers',
        gender: 'unisex',
        isNew: false,
        isSale: false,
        rating: 4.50,
        reviewCount: 567,
        affiliateLinks: {
          amazon: 'https://amazon.com/dp/B08DEF5678',
          asos: 'https://www.asos.com/vans/vans-old-skool/prd/901234'
        },
        sizes: ['6', '7', '8', '9', '10', '11', '12', '13'],
        colors: ['Black/White', 'Navy/White', 'Checkerboard'],
        tags: ['vans', 'old skool', 'skate', 'classic']
      },

      // ACCESSORIES
      {
        id: 'a1',
        name: 'Utility Crossbody Bag',
        brand: 'Carhartt WIP',
        description: 'Durable crossbody bag with multiple compartments and adjustable strap',
        price: 89.00,
        images: ['/accessory-bag.jpg'],
        category: 'accessories',
        gender: 'unisex',
        isNew: true,
        isSale: false,
        rating: 4.60,
        reviewCount: 156,
        affiliateLinks: {
          amazon: 'https://amazon.com/dp/B08GHI7890',
          asos: 'https://www.asos.com/carhartt-wip/carhartt-wip-utility-bag/prd/012345'
        },
        sizes: ['One Size'],
        colors: ['Black', 'Brown', 'Navy'],
        tags: ['bag', 'crossbody', 'carhartt', 'utility']
      },
      {
        id: 'a2',
        name: 'Silver Cross Chain',
        brand: 'Vivienne Westwood',
        description: 'Sterling silver cross pendant on matching chain necklace',
        price: 195.00,
        images: ['/accessory-chain.jpg'],
        category: 'accessories',
        gender: 'unisex',
        isNew: false,
        isSale: false,
        rating: 4.90,
        reviewCount: 67,
        affiliateLinks: {
          farfetch: 'https://www.farfetch.com/shopping/men/vivienne-westwood-silver-cross-chain-item-123456.aspx',
          amazon: 'https://amazon.com/dp/B08JKL9012'
        },
        sizes: ['18 inch', '20 inch', '24 inch'],
        colors: ['Silver'],
        tags: ['necklace', 'chain', 'cross', 'vivienne westwood', 'silver']
      },
      {
        id: 'a3',
        name: 'Logo Bucket Hat',
        brand: 'Palace',
        description: 'Cotton bucket hat with embroidered logo detail',
        price: 55.00,
        images: ['/accessory-hat.jpg'],
        category: 'accessories',
        gender: 'unisex',
        isNew: true,
        isSale: false,
        rating: 4.70,
        reviewCount: 234,
        affiliateLinks: {
          stockx: 'https://stockx.com/palace-logo-bucket-hat-black',
          amazon: 'https://amazon.com/dp/B08MNO3456'
        },
        sizes: ['One Size'],
        colors: ['Black', 'White', 'Navy'],
        tags: ['hat', 'bucket', 'palace', 'skate']
      },
      {
        id: 'a4',
        name: 'Leather Belt',
        brand: 'Gucci',
        description: 'Premium leather belt with iconic GG buckle',
        price: 450.00,
        images: ['/accessory-belt.jpg'],
        category: 'accessories',
        gender: 'men',
        isNew: false,
        isSale: false,
        rating: 4.80,
        reviewCount: 89,
        affiliateLinks: {
          farfetch: 'https://www.farfetch.com/shopping/men/gucci-leather-belt-with-gg-buckle-item-234567.aspx',
          amazon: 'https://amazon.com/dp/B08PQR7890'
        },
        sizes: ['30', '32', '34', '36', '38', '40'],
        colors: ['Black', 'Brown'],
        tags: ['belt', 'leather', 'gucci', 'luxury']
      },
      {
        id: 'a5',
        name: 'Sporty Sunglasses',
        brand: 'Oakley',
        description: 'Performance sunglasses with polarized lenses and lightweight frame',
        price: 165.00,
        images: ['/accessory-sunglasses.jpg'],
        category: 'accessories',
        gender: 'unisex',
        isNew: true,
        isSale: false,
        rating: 4.50,
        reviewCount: 198,
        affiliateLinks: {
          amazon: 'https://amazon.com/dp/B08STU1234',
          asos: 'https://www.asos.com/oakley/oakley-sporty-sunglasses/prd/234567'
        },
        sizes: ['One Size'],
        colors: ['Black', 'Matte Black', 'Tortoise'],
        tags: ['sunglasses', 'oakley', 'sport', 'polarized']
      },
      {
        id: 'a6',
        name: 'Classic Watch',
        brand: 'Casio',
        description: 'Digital watch with alarm, stopwatch, and water resistance',
        price: 65.00,
        images: ['/accessory-watch.jpg'],
        category: 'accessories',
        gender: 'men',
        isNew: false,
        isSale: false,
        rating: 4.60,
        reviewCount: 445,
        affiliateLinks: {
          amazon: 'https://amazon.com/dp/B08VWX5678',
          asos: 'https://www.asos.com/casio/casio-classic-watch/prd/345678'
        },
        sizes: ['One Size'],
        colors: ['Black', 'Silver', 'Gold'],
        tags: ['watch', 'casio', 'digital', 'classic']
      }
    ];

    await queryInterface.bulkInsert('Products', products.map(p => ({
      ...p,
      createdAt: new Date(),
      updatedAt: new Date()
    })));
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
