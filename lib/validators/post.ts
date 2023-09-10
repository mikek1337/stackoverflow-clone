import { z } from "zod";

export const PostValidator = z.object({
    title: z
        .string()
        .min(3, { message: "Title must be at least 3 character long" })
        .max(128, { message: "Title must be under 128 characters" }),
    problemDetail: z.any(),
    triedMethods: z.any(),
    tags: z.string(),
});

export type PostCreationRequest = z.infer<typeof PostValidator>