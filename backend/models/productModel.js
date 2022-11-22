import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, default: 0 },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const prodctSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: false },
  brand: { type: String, required: false },
  minprice: { type: Number, default: 0, required: true },
  maxprice: { type: Number, default: 0, required: true },
  addr: { type: String, default: '', required: true },
  optionn: { type: Array, default: [], required: false },
  currency: { type: String, default: 'KRW', required: true },
  category: { type: String, required: true },
  countInStock: { type: Number, default: 0, required: true },
  description: { type: String, required: true },
  rating: { type: Number, default: 0, required: true },
  numReviews: { type: Number, default: 0, required: true },
  reviews: [reviewSchema],
});

const productModel = mongoose.model('Product', prodctSchema);

export default productModel;
