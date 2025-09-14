const mongoose = require('mongoose');
require('dotenv').config();

const User = require('../models/User');
const Product = require('../models/Product');

// Connect to database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/grocery-store', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Sample data
const sampleProducts = [
  {
    name: "Fresh Bananas",
    description: "Sweet and ripe bananas perfect for snacking or baking",
    price: 2.99,
    category: "Fresh Fruits",
    images: [{ url: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400", alt: "Fresh Bananas" }],
    stock: 50,
    unit: "kg",
    isOrganic: true,
    tags: ["healthy", "potassium", "snack"]
  },
  {
    name: "Organic Spinach",
    description: "Fresh organic spinach leaves, perfect for salads and cooking",
    price: 3.49,
    category: "Vegetables",
    images: [{ url: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400", alt: "Organic Spinach" }],
    stock: 30,
    unit: "bunch",
    isOrganic: true,
    tags: ["leafy", "iron", "healthy"]
  },
  {
    name: "Whole Milk",
    description: "Fresh whole milk from local farms",
    price: 4.29,
    category: "Dairy & Eggs",
    images: [{ url: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400", alt: "Whole Milk" }],
    stock: 25,
    unit: "liter",
    tags: ["calcium", "protein", "fresh"]
  },
  {
    name: "Chicken Breast",
    description: "Premium chicken breast, hormone-free",
    price: 8.99,
    category: "Meat & Seafood",
    images: [{ url: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400", alt: "Chicken Breast" }],
    stock: 20,
    unit: "kg",
    tags: ["protein", "lean", "hormone-free"]
  },
  {
    name: "Whole Wheat Bread",
    description: "Freshly baked whole wheat bread",
    price: 3.99,
    category: "Bakery",
    images: [{ url: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400", alt: "Whole Wheat Bread" }],
    stock: 15,
    unit: "loaf",
    tags: ["whole grain", "fiber", "fresh"]
  },
  {
    name: "Orange Juice",
    description: "100% pure orange juice, no added sugar",
    price: 5.49,
    category: "Beverages",
    images: [{ url: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400", alt: "Orange Juice" }],
    stock: 40,
    unit: "liter",
    tags: ["vitamin C", "natural", "no sugar"]
  },
  {
    name: "Greek Yogurt",
    description: "Creamy Greek yogurt with probiotics",
    price: 6.99,
    category: "Dairy & Eggs",
    images: [{ url: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400", alt: "Greek Yogurt" }],
    stock: 35,
    unit: "container",
    tags: ["probiotics", "protein", "healthy"]
  },
  {
    name: "Salmon Fillet",
    description: "Fresh Atlantic salmon fillet, rich in omega-3",
    price: 15.99,
    category: "Meat & Seafood",
    images: [{ url: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400", alt: "Salmon Fillet" }],
    stock: 12,
    unit: "kg",
    tags: ["omega-3", "protein", "fresh"]
  }
];

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});

    console.log('🗑️ Cleared existing data');

    // Create admin user
    const adminUser = new User({
      name: 'Admin User',
      email: process.env.ADMIN_EMAIL || 'admin@snapit.com',
      password: process.env.ADMIN_PASSWORD || 'admin123', // Pass plain text password
      role: 'admin',
      isActive: true
    });

    await adminUser.save();
    console.log('👤 Created admin user');

    // Create sample user
    const sampleUser = new User({
      name: 'John Doe',
      email: 'user@example.com',
      password: 'user123', // Pass plain text password
      phone: '+1-555-0123',
      address: {
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA'
      }
    });

    await sampleUser.save();
    console.log('👤 Created sample user');

    // Create products
    for (const productData of sampleProducts) {
      const product = new Product(productData);
      await product.save();
    }

    console.log(`📦 Created ${sampleProducts.length} sample products`);

    console.log('✅ Database seeding completed!');
    console.log(`
📋 Admin Credentials:
Email: ${process.env.ADMIN_EMAIL || 'admin@snapit.com'}
Password: ${process.env.ADMIN_PASSWORD || 'admin123'}

📋 Sample User Credentials:
Email: user@example.com
Password: user123
    `);

  } catch (error) {
    console.error('❌ Seeding failed:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();
