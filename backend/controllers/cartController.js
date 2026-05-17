import Cart from "../models/Cart.js";


// SAVE CART
export const saveCart = async (
  req,
  res
) => {

  try {

    const cart =
      await Cart.findOneAndUpdate(
        {
          user: req.user._id,
        },

        {
          items: req.body.data,
        },

        {
          new: true,
          upsert: true,
        }
      );

    res.json(cart);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// GET CART
export const getCart = async (
  req,
  res
) => {

  try {

    const cart =
      await Cart.findOne({
        user: req.user._id,
      }).populate("items.product");

    res.json(cart);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};