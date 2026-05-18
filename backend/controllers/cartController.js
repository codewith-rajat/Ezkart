import Cart from "../models/Cart.js";


// SAVE CART
export const saveCart = async (
  req,
  res
) => {

  try {
    console.log("Save cart called with body:", req.body);
    console.log("User ID:", req.user._id);

    const cart =
      await Cart.findOneAndUpdate(
        {
          user: req.user._id,
        },

        {
          items: req.body.data || req.body, 
        },

        {
          new: true,
          upsert: true,
        }
      );

    res.json(cart);

  } catch (error) {
    console.error("Cart save error:", error);
    res.status(500).json({
      message: error.message,
    });

  }
};


// GET CART
// GET CART
export const getCart = async (req, res) => {
  try {
    const Cart = (await import("../models/Cart.js")).default;
    const Product = (await import("../models/Product.js")).default;

    const cart = await Cart.findOne({
      user: req.user._id,
    }).lean(); // IMPORTANT

    if (cart && cart.items && cart.items.length > 0) {
      const productIds = cart.items.map(item => Number(item.product));

      const products = await Product.find({
        id: { $in: productIds }
      }).lean();

      const productMap = {};

      products.forEach(product => {
        productMap[product.id] = product;
      });

      cart.items = cart.items.map(item => ({
        product: item.product,
        quantity: item.quantity,
        productDetails: productMap[item.product] || null
      }));
    }

    res.json(cart);

  } catch (error) {
    console.error("Cart get error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};