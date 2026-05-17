import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    id:{ type: Number, required: true, unique: true},
    title: {type: String,required: true},
    description: {type: String},
    category: {type: String},
    price: {type: Number,required: true},
    discountPercentage: {type: Number,default: 0},
    rating: {type: Number,default: 0},
    stock: {type: Number,default: 0},
    tags: [String],
    brand: {type: String},
    sku: {type: String},
    weight: {type: Number},
    dimensions: {width: Number,height: Number,depth: Number},
    warrantyInformation: {type: String},
    shippingInformation: {type: String},
    availabilityStatus: {type: String},
    returnPolicy: {type: String},
    minimumOrderQuantity: {type: Number},
    meta: {barcode: String,qrCode: String},
    images: [String],
    thumbnail: {type: String},
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model(
  "Product",
  productSchema
);

export default Product;