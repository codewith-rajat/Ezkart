import Product from "../models/Product.js";


// GET ALL PRODUCTS
export const getProducts = async (
  req,
  res
) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    // Fetch all products from database
    const products = await Product.find()
      .skip(skip)
      .limit(limit);

    const total = await Product.countDocuments();

    console.log(`Returning ${products.length} products from page ${page}`);

    res.json({
      data: products,
      meta: {
        total,
        last_page: Math.ceil(total / limit),
        current_page: page,
        per_page: limit,
      },
    });

  } catch (error) {
    console.log("Error in getProducts:", error);
    res.status(500).json({
      message: error.message,
    });

  }
};


// GET SINGLE PRODUCT
export const getSingleProduct =
  async (req, res) => {

    try {

      const product =
        await Product.findOne({
          id: req.params.id
        });

      if (!product) {
        return res
          .status(404)
          .json({
            message:
              "Product not found",
          });
      }

      res.json(product);

    } catch (error) {
      console.log("Error in getSingleProduct:", error);
      res.status(500).json({
        message: error.message,
      });

    }
  };    


// GET PRODUCTS BY IDS
export const getProductsByIds =
  async (req, res) => {

    try {

      const ids =
        req.query.ids.split(",").map(id => parseInt(id));

      const products =
        await Product.find({
          id: { $in: ids },
        });

      res.json(products);

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  };