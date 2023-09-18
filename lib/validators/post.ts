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

export const AnswerPostValidator = z.object({
    content: z.any(),
    questionId: z.string(),
});

export const VotePostValidator = z.object({
    questionId: z.string(),
    voteType: z.enum(["UP", "DOWN"]),
});

export const UserPostValidator = z.object({
    username: z
        .string()
        .min(5, { message: "username needs to be at least 5 characters" })
        .max(10, { message: "username exceeded character limit" })
        .nonempty({ message: "username required" }),
    name: z.string().min(3, { message: "name needs to be at least 3 characters" }).nonempty({ message: "username required" })
});

export type PostCreationRequest = z.infer<typeof PostValidator>;
export type AnswerCreationRequest = z.infer<typeof AnswerPostValidator>;
export type VotePostValidator = z.infer<typeof VotePostValidator>;
