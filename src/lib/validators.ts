import { z } from "zod";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_FILE_TYPES = [
  "application/zip",
  "application/x-zip-compressed",
  "application/pdf",
];
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

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
  description: z.string().min(10, "Description is too short"),
  price: z.number("Price is required").min(0, "Price must be greater than or equal to 0"),
  mainCategory: z.string().min(1, "Category is required"),
  subCategory: z.string().min(1, "SubCategory is required"),
  previewFile: z
    .custom<FileList>()
    .refine((files) => files?.length === 1, "Preview image is required")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      "Max file size is 10MB"
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only image file is allowed"
    ),
  assetFile: z
    .custom<FileList>()
    .refine((files) => files?.length === 1, "Asset file is required")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      "Max file size is 10MB"
    )
    .refine(
      (files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
      "Only ZIP or PDF file is allowed"
    ),
});

export const assetServerSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  price: z.number().min(0),
  mainCategory: z.string().min(1),
  subCategory: z.string().min(1),
  previewUrl: z.url(),
  assetPath: z.string().min(10),
});


export type LoginValues = z.infer<typeof loginSchema>;
export type SignupValues = z.infer<typeof signupSchema>;
export type AssetValues = z.infer<typeof assetSchema>;
