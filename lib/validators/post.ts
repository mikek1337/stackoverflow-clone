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
    questionId: z.string()
})

export const VotePostValidator = z.object({
    questionId: z.string(),
    voteType: z.enum(["UP", "DOWN"])
})

export type PostCreationRequest = z.infer<typeof PostValidator>
export type AnswerCreationRequest = z.infer<typeof AnswerPostValidator>
export type VotePostValidator = z.infer<typeof VotePostValidator>