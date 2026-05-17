import express from "express";

import {
  saveCart,
  getCart,
} from "../controllers/cartController.js";

import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  saveCart
);

router.get(
  "/",
  protect,
  getCart
);

export default router;