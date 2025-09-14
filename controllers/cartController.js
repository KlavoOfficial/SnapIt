const User = require('../models/User');
const Product = require('../models/Product');

// Get user's cart
const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: 'cart.product',
      select: 'name price images stock isActive'
    });

    // Filter out inactive products
    const activeCartItems = user.cart.filter(item => 
      item.product && item.product.isActive
    );

    res.json({
      success: true,
      data: {
        cart: activeCartItems,
        total: calculateCartTotal(activeCartItems)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch cart',
      error: error.message
    });
  }
};

// Add item to cart
const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const userId = req.user._id;

    // Validate product
    const product = await Product.findById(productId);
    if (!product || !product.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Check stock
    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient stock available'
      });
    }

    const user = await User.findById(userId);
    const existingItemIndex = user.cart.findIndex(
      item => item.product.toString() === productId
    );

    if (existingItemIndex > -1) {
      // Update existing item
      const newQuantity = user.cart[existingItemIndex].quantity + quantity;
      
      if (newQuantity > product.stock) {
        return res.status(400).json({
          success: false,
          message: 'Cannot add more items. Insufficient stock.'
        });
      }

      user.cart[existingItemIndex].quantity = newQuantity;
    } else {
      // Add new item
      user.cart.push({ product: productId, quantity });
    }

    await user.save();

    // Return updated cart
    const updatedUser = await User.findById(userId).populate({
      path: 'cart.product',
      select: 'name price images stock isActive'
    });

    res.json({
      success: true,
      message: 'Item added to cart',
      data: {
        cart: updatedUser.cart,
        total: calculateCartTotal(updatedUser.cart)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to add item to cart',
      error: error.message
    });
  }
};

// Update cart item quantity
const updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    if (quantity < 1) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be at least 1'
      });
    }

    const product = await Product.findById(productId);
    if (!product || !product.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient stock available'
      });
    }

    const user = await User.findById(userId);
    const itemIndex = user.cart.findIndex(
      item => item.product.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Item not found in cart'
      });
    }

    user.cart[itemIndex].quantity = quantity;
    await user.save();

    // Return updated cart
    const updatedUser = await User.findById(userId).populate({
      path: 'cart.product',
      select: 'name price images stock isActive'
    });

    res.json({
      success: true,
      message: 'Cart updated successfully',
      data: {
        cart: updatedUser.cart,
        total: calculateCartTotal(updatedUser.cart)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update cart',
      error: error.message
    });
  }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user._id;

    const user = await User.findById(userId);
    user.cart = user.cart.filter(
      item => item.product.toString() !== productId
    );

    await user.save();

    // Return updated cart
    const updatedUser = await User.findById(userId).populate({
      path: 'cart.product',
      select: 'name price images stock isActive'
    });

    res.json({
      success: true,
      message: 'Item removed from cart',
      data: {
        cart: updatedUser.cart,
        total: calculateCartTotal(updatedUser.cart)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to remove item from cart',
      error: error.message
    });
  }
};

// Clear entire cart
const clearCart = async (req, res) => {
  try {
    const userId = req.user._id;

    await User.findByIdAndUpdate(userId, { cart: [] });

    res.json({
      success: true,
      message: 'Cart cleared successfully',
      data: {
        cart: [],
        total: 0
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to clear cart',
      error: error.message
    });
  }
};

// Helper function to calculate cart total
const calculateCartTotal = (cartItems) => {
  return cartItems.reduce((total, item) => {
    if (item.product && item.product.price) {
      return total + (item.product.price * item.quantity);
    }
    return total;
  }, 0);
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
};
