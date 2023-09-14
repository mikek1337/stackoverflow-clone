import type { Question, User, Vote, Answer, AnswerVote } from "@prisma/client";

export type PostedQuestion = Question & {
    user: User
}

export type QuestionDetail = Question & {
    user: User,
    votes: Vote[],
    answers: (Answer & {
        user: User,
        votes: AnswerVote[]
    })[]
}

