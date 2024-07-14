import { z } from 'zod';

const MAX_UPLOAD_SIZE = 1024 * 1024 * 1; // 3MB
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp","image/gif"];

const FileSchema = z
  .instanceof(File)
  .refine((file) => {
    return !file || file.size <= MAX_UPLOAD_SIZE;
  }, 'File size must be less than 1MB')
  .refine((file) => {
    return ACCEPTED_FILE_TYPES.includes(file.type);
  }, 'File must be an image').array();

export const schema = z.object({
    name: z.string({ message: "Token's name must be more then 0 and less then 10 chracters.", }).min(1).max(10),
    ticker: z.string({ message: "Token's ticker must be more then 0 and less then 10 chracters." }).min(1).max(10),
    description: z.string({ message: "Description must not be more then 500 characters." }).min(0).max(500),
    icon: FileSchema,
    twitter: z.string().url(),
    discord: z.string().url(),
    telegram: z.string().url(),
    website: z.string().url(),
}).required({
    name: true,
    ticker: true,
    description: true,
    icon: true
}).partial({
    twitter: true,
    discord: true,
    telegram: true,
    website: true,
});
