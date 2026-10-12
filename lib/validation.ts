import { z } from "zod";
export const phoneSchema = z.string().regex(/^(\+971|00971|0)5[0-9]{8}$/, "Use a valid UAE mobile number");
export const emiratesIdSchema = z.string().regex(/^784-\d{4}-\d{7}-\d$/, "Use 784-XXXX-XXXXXXX-X format");
export const checkoutSchema = z.object({ city: z.string().min(2), address: z.string().min(8), phone: phoneSchema, emiratesId: emiratesIdSchema.optional().or(z.literal("")), paymentMethod: z.enum(["STRIPE", "TABBY", "COD"]) });
export const productSchema = z.object({ name: z.string().min(2), slug: z.string().min(2).regex(/^[a-z0-9-]+$/), description: z.string().min(10), price: z.coerce.number().positive(), stock: z.coerce.number().int().nonnegative(), categoryId: z.string().min(1), featured: z.boolean().default(false) });
export const categorySchema = z.object({ name: z.string().min(2).max(80), slug: z.string().min(2).max(80).regex(/^[a-z0-9-]+$/), description: z.string().max(300).optional().nullable() });
export const orderStatusSchema = z.enum(["PENDING", "PAID", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"]);
export const orderRequestSchema = checkoutSchema.extend({
  items: z.array(z.object({ id: z.string().min(1), quantity: z.number().int().positive().max(20) })).min(1),
});
