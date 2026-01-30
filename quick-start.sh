#!/bin/bash

echo "🚀 Vybe Backend Quick Start"
echo "=========================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL is not installed. Please install PostgreSQL first."
    echo "   Visit: https://www.postgresql.org/download/"
    exit 1
fi

echo "✅ Dependencies check passed"

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo "📄 Creating .env file from .env.example"
    cp .env.example .env
    echo "   ⚠️  Please edit .env file with your configuration"
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create PostgreSQL database
echo "🗄️ Setting up PostgreSQL database..."
sudo -u postgres psql -c "CREATE DATABASE vybe_db;" 2>/dev/null || echo "Database may already exist"
sudo -u postgres psql -c "CREATE USER vybe_user WITH PASSWORD 'vybe_password';" 2>/dev/null || echo "User may already exist"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE vybe_db TO vybe_user;" 2>/dev/null || true

# Setup database
echo "🏗️ Setting up database schema..."
node database-setup.js

# Start server
echo "🚀 Starting Vybe backend server..."
echo "   Server will be available at: http://localhost:5000"
echo "   Health check: http://localhost:5000/api/health"
echo ""
echo "📖 API Documentation:"
echo "   Check README.md for full API documentation"
echo ""

# Start in development mode
npm run dev
