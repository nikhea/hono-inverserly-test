import { z } from "zod";
export const addToCartSchema = z.object({
    productId: z.string(),
    quantity: z.number().int().min(1),
});
export const removeFromCartSchema = z.object({
    productId: z.string(),
});
