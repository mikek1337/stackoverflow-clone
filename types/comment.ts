import { AnswerComment, QuestionComment, User } from "@prisma/client";

export type QuestionCommentWithUser = QuestionComment &{
    user:User
}

export type AnswerCommentWithUser = AnswerComment &{
    user:User
}
export type CommentState = {
    comment:string,
    id:string,
    user:{
        username:string
    },
    postedDate:Date
}
