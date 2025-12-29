import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});


export const signupSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum(["USER", "SELLER"]),
});

export const assetSchema = z.object({
  title: z.string().min(3, "Title is too short"),
  description: z.string().min(10, "Description is required"),
  price: z.number().min(0, "Price must be greater than or equal to 0"),
  mainCategory: z.string().min(1, "Category is required"),
  subCategory: z.string().min(1, "SubCategory is required"),
  preview: z.any().refine((file) => file?.length === 1, "Preview image is required"),
  assetFile: z.any().refine((file) => file?.length === 1, "Asset file is required"),
});


export type LoginValues = z.infer<typeof loginSchema>;
export type SignupValues = z.infer<typeof signupSchema>;
export type AssetValues = z.infer<typeof assetSchema>;
