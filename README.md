# Vybe Backend

Complete backend API for Vybe - AI Outfit Generator & Streetwear Discovery App

## Features

- ✅ User Authentication (JWT)
- ✅ Product Catalog with Filtering & Search
- ✅ Saved Items / Digital Wardrobe
- ✅ AI Outfit Generator (OpenAI Integration)
- ✅ Affiliate Link Tracking
- ✅ Reviews & Ratings
- ✅ Pro Membership System
- ✅ RESTful API Design

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL
- **ORM:** Sequelize
- **Authentication:** JWT (JSON Web Tokens)
- **AI Integration:** OpenAI GPT-4 Vision
- **Image Hosting:** Cloudinary (optional)

## Project Structure

```
vybe-backend/
├── models/           # Database models
├── routes/           # API routes
├── middleware/       # Authentication & error handling
├── utils/            # Utility functions (AI, etc)
├── server.js         # Main server file
├── database-setup.js # Database initialization script
├── .env              # Environment variables
└── package.json      # Dependencies
```

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Database Setup

Install PostgreSQL and create a database:

```bash
# On macOS with Homebrew
brew install postgresql
brew services start postgresql

# Create database and user
psql postgres
CREATE DATABASE vybe_db;
CREATE USER vybe_user WITH PASSWORD 'vybe_password';
GRANT ALL PRIVILEGES ON DATABASE vybe_db TO vybe_user;
\q
```

### 3. Environment Configuration

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Required environment variables:

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=vybe_user
DB_PASSWORD=vybe_password
DB_NAME=vybe_db

# JWT Secret (generate a secure random string)
JWT_SECRET=your-super-secret-jwt-key-here

# OpenAI (optional - for AI outfit generation)
OPENAI_API_KEY=your-openai-api-key

# Server
PORT=5000
NODE_ENV=development
```

### 4. Setup Database

```bash
node database-setup.js
```

This will:
- Create all database tables
- Insert sample products
- Set up relationships

### 5. Start the Server

```bash
# Development mode
npm run dev

# Production mode
npm start
```

The server will start on http://localhost:5000

## API Endpoints

### Authentication

```
POST /api/auth/register     # Register new user
POST /api/auth/login        # Login user
GET  /api/auth/me           # Get current user profile
PUT  /api/auth/profile      # Update user profile
```

### Products

```
GET /api/products                    # Get all products (with filters)
GET /api/products/:id                # Get single product
GET /api/products/featured/new       # Get new products
GET /api/products/featured/sale      # Get sale products
GET /api/products/category/:category # Get products by category
GET /api/products/search/:query      # Search products
GET /api/products/:id/affiliate-links # Get affiliate links
```

### Users

```
GET  /api/users/saved-items           # Get user's saved items
POST /api/users/saved-items           # Save a product
DELETE /api/users/saved-items/:id     # Remove saved item
GET  /api/users/saved-items/folders   # Get saved item folders
GET  /api/users/stats                 # Get user statistics
```

### Outfits (AI Generator)

```
POST /api/outfits/generate            # Generate AI outfit
GET  /api/outfits/my-outfits          # Get user's outfits
GET  /api/outfits/explore             # Get public outfits
GET  /api/outfits/:id                 # Get single outfit
PUT  /api/outfits/:id                 # Update outfit
DELETE /api/outfits/:id               # Delete outfit
POST /api/outfits/:id/like            # Like outfit
```

## Example API Requests

### Register User

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe"
  }'
```

### Get Products

```bash
curl -X GET "http://localhost:5000/api/products?category=trainers&page=1&limit=10"
```

### Save Product (requires auth)

```bash
curl -X POST http://localhost:5000/api/users/saved-items \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "productId": "123e4567-e89b-12d3-a456-426614174000"
  }'
```

### Generate AI Outfit (requires auth)

```bash
curl -X POST http://localhost:5000/api/outfits/generate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "productId": "123e4567-e89b-12d3-a456-426614174000",
    "style": "street"
  }'
```

## Database Schema

### Users
- id (UUID, Primary Key)
- email (String, Unique)
- password (String, Hashed)
- name (String)
- avatar (String, URL)
- isPro (Boolean)
- proExpiresAt (Date)
- preferences (JSONB)
- timestamps

### Products
- id (UUID, Primary Key)
- name (String)
- brand (String)
- description (Text)
- price (Decimal)
- originalPrice (Decimal)
- images (JSONB)
- category (Enum: clothing, trainers, accessories)
- gender (Enum: men, women, unisex)
- isNew, isSale (Boolean)
- rating, reviewCount (Decimal, Integer)
- affiliateLinks (JSONB)
- sizes, colors, tags (JSONB)
- timestamps

### SavedItem
- id (UUID, Primary Key)
- userId (UUID, Foreign Key)
- productId (UUID, Foreign Key)
- folder (String)
- notes (Text)
- timestamps

### Outfit
- id (UUID, Primary Key)
- userId (UUID, Foreign Key)
- name, description (String, Text)
- items (JSONB)
- imageUrl (String)
- style (Enum)
- isPublic, likes (Boolean, Integer)
- timestamps

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| NODE_ENV | Environment | development |
| DB_HOST | Database host | localhost |
| DB_PORT | Database port | 5432 |
| DB_USER | Database user | vybe_user |
| DB_PASSWORD | Database password | vybe_password |
| DB_NAME | Database name | vybe_db |
| JWT_SECRET | JWT signing key | (required) |
| JWT_EXPIRES_IN | Token expiry | 7d |
| OPENAI_API_KEY | OpenAI API key | (optional) |

## Deployment

### Using Docker (Recommended)

```bash
# Build image
docker build -t vybe-backend .

# Run container
docker run -p 5000:5000 --env-file .env vybe-backend
```

### Using PM2 (Production)

```bash
npm install -g pm2
pm2 start server.js --name vybe-backend
```

### Using Heroku

```bash
heroku create vybe-backend
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your-secret
# Set all other environment variables
git push heroku main
```

## Testing

Run tests (when implemented):

```bash
npm test
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is proprietary software for Vybe App.

## Support

For technical support or questions:
- Create an issue in the repository
- Contact the development team
- Check the API documentation
