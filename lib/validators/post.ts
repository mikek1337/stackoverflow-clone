import { z } from "zod";

export const PostValidator = z.object({
    title: z
        .string()
        .min(3, { message: "Title must be at least 3 character long" })
        .max(500, { message: "Title must be under 500 characters" }),
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
    name: z
        .string()
        .min(3, { message: "name needs to be at least 3 characters" })
        .nonempty({ message: "username required" }),
    imagePath: z.string(),
    location: z.string(),
    github: z.string(),
    linkden: z.string(),
    twitter: z.string(),
    about: z.string(),


});

export const CommentPostValidator = z.object({
    comment: z.string().max(512, { message: "comment exceeds 512 characters" }),
    questionId: z.string(),
    userId: z.string()
});

export type CommentPostValidator = z.infer<typeof CommentPostValidator>;
export type PostCreationRequest = z.infer<typeof PostValidator>;
export type AnswerCreationRequest = z.infer<typeof AnswerPostValidator>;
export type VotePostValidator = z.infer<typeof VotePostValidator>;
export type UserPostValidator = z.infer<typeof UserPostValidator>;
