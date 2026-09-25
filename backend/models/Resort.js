import mongoose from "mongoose";

const resortSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    imageUrl: { type: String, required: true },
    description: { type: String, required: true },
    priceUSD: { type: Number, required: true, min: 0 },
    priceEUR: { type: Number, required: true, min: 0 },
    priceGBP: { type: Number, required: true, min: 0 },
    priceAED: { type: Number, required: true, min: 0 },
    priceINR: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Resort", resortSchema);
