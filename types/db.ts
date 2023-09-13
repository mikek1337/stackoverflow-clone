import type { Question, User, Vote } from "@prisma/client";

export type PostedQuestion = Question & {
    user: User
}