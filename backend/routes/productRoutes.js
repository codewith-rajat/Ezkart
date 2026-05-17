import express from "express";

import {
  getProducts,
  getSingleProduct,
  getProductsByIds,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/bulk", getProductsByIds);
router.get("/:id", getSingleProduct);


export default router;