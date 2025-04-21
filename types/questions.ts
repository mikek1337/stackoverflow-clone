import type { Question, QuestionComment, User, Vote } from "@prisma/client";

export type QuestionsWithComments = Question & QuestionComment;
export type QuestionsWithVotes = Question & Vote;
export type QuestionWithCommentsAndVotes = Question & {
    QuestionComment: QuestionComment[] & User,
    votes: Vote[],
    user:User
}
