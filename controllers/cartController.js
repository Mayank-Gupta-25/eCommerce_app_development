import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";


export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ user: userId })
      .populate("items.product");

    if (!cart) {
      return res.status(200).json({
        message: "Cart is empty",
        cart: null
      });
    }

    res.status(200).json({
      cart
    });

  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch cart",
      message: error.message
    });
  }
};

export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    // 1. Validate product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.quantity < quantity) {
      return res.status(400).json({ message: "Insufficient stock" });
    }

    // 2. Find or create cart
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [],
        totalAmount: 0
      });
    }

    // 3. Check if product already exists
    const itemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      // Update quantity
      cart.items[itemIndex].quantity += quantity;
      cart.items[itemIndex].subtotal =
        cart.items[itemIndex].quantity * cart.items[itemIndex].price;
    } else {
      // Add new item
      cart.items.push({
        product: productId,
        quantity,
        price: product.price,
        subtotal: product.price * quantity
      });
    }

    // 4. Recalculate total
    cart.totalAmount = cart.items.reduce(
      (sum, item) => sum + item.subtotal,
      0
    );

    await cart.save();

    res.status(200).json({
      message: "Product added to cart",
      cart
    });

  } catch (error) {
    res.status(500).json({
      error: "Failed to add product to cart",
      message: error.message
    });
  }
};


export const updateCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    if (quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.find(
      item => item.product.toString() === productId
    );

    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    item.quantity = quantity;
    item.subtotal = item.price * quantity;

    cart.totalAmount = cart.items.reduce(
      (sum, item) => sum + item.subtotal,
      0
    );

    await cart.save();

    res.status(200).json({
      message: "Cart updated",
      cart
    });

  } catch (error) {
    res.status(500).json({
      error: "Failed to update cart",
      message: error.message
    });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      item => item.product.toString() !== productId
    );

    cart.totalAmount = cart.items.reduce(
      (sum, item) => sum + item.subtotal,
      0
    );

    await cart.save();

    res.status(200).json({
      message: "Item removed from cart",
      cart
    });

  } catch (error) {
    res.status(500).json({
      error: "Failed to remove item",
      message: error.message
    });
  }
};

export const clearCart = async (req, res) => {
  try {
    const userId = req.user.id;

    await Cart.findOneAndDelete({ user: userId });

    res.status(200).json({
      message: "Cart cleared"
    });

  } catch (error) {
    res.status(500).json({
      error: "Failed to clear cart",
      message: error.message
    });
  }
};
