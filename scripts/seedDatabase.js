const mongoose = require('mongoose');
require('dotenv').config();

const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const Feedback = require('../models/Feedback');

// Connect to database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/grocery-store', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database reset and seeding...');

    // Clear ALL existing data for a clean slate
    await User.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});
    await Feedback.deleteMany({});

    console.log('🗑️ Cleared ALL existing data from Users, Products, Orders, and Feedback collections.');

    // Create admin user
    // The password will be automatically hashed by the pre-save hook in the User model
    const adminUser = new User({
      name: 'Admin User',
      username: 'admin',
      email: process.env.ADMIN_EMAIL || 'admin@snapit.com',
      password: process.env.ADMIN_PASSWORD || 'admin123',
      role: 'admin',
      isActive: true
    });

    await adminUser.save();
    console.log('👤 Created admin user with a fresh, correctly hashed password.');

    // Create sample user
    const sampleUser = new User({
      name: 'John Doe',
      username: 'johndoe',
      email: 'user@example.com',
      password: 'user123',
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
    console.log('👤 Created sample user.');

    // Sample products data (shortened for brevity)
    const sampleProducts = [
      { name: "Fresh Bananas", description: "Sweet and ripe bananas", price: 2.99, category: "Fresh Fruits", images: [{ url: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400", alt: "Fresh Bananas" }], stock: 50, unit: "kg", isOrganic: true, tags: ["healthy", "potassium", "snack"] },
      { name: "Organic Spinach", description: "Fresh organic spinach leaves", price: 3.49, category: "Vegetables", images: [{ url: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400", alt: "Organic Spinach" }], stock: 30, unit: "bunch", isOrganic: true, tags: ["leafy", "iron", "healthy"] },
      { name: "Whole Milk", description: "Fresh whole milk from local farms", price: 4.29, category: "Dairy & Eggs", images: [{ url: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400", alt: "Whole Milk" }], stock: 25, unit: "liter", tags: ["calcium", "protein", "fresh"] },
      { name: "Chicken Breast", description: "Premium chicken breast, hormone-free", price: 8.99, category: "Meat & Seafood", images: [{ url: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400", alt: "Chicken Breast" }], stock: 20, unit: "kg", tags: ["protein", "lean", "hormone-free"] }
    ];

    // Create products
    await Product.insertMany(sampleProducts);
    console.log(`📦 Created ${sampleProducts.length} sample products`);

    console.log('✅ Database seeding completed successfully!');
    console.log(`
    
    -----------------------------------------
    LOGIN CREDENTIALS
    -----------------------------------------
    Admin:
      Username: admin
      Password: ${process.env.ADMIN_PASSWORD || 'admin123'}

    Sample User:
      Username: johndoe
      Password: user123
    -----------------------------------------
    `);

  } catch (error) {
    console.error('❌ Seeding failed:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();
