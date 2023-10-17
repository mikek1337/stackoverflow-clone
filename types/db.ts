import type { Question, User, Vote, Answer, AnswerVote, AnswerComment } from "@prisma/client";

export type PostedQuestion = Question & {
    user: User
}
interface content {
    blocks: contentData[]
}
interface contentData {
    data: any,
    id: string,
    type: string,
}
export type QuestionDetail = Question & {
    user: User,
    problemDetail: content,
    triedMethods: content,
    votes: Vote[],
    answers: (Answer & {
        user: User,
        votes: AnswerVote[]
    })[]
}

export type AnswerDetail = Answer & {
    user: User,
    votes: AnswerVote[],
    AnswerComment: AnswerComment[]
}

