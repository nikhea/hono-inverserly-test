import { Schema, model } from "mongoose";
const cartItemSchema = new Schema({
    productId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 },
}, { _id: false });
const cartSchema = new Schema({
    userId: { type: String, required: true, unique: true },
    items: { type: [cartItemSchema], default: [] },
    total: { type: Number, default: 0 },
}, { timestamps: true });
export const CartModel = model("Cart", cartSchema);
