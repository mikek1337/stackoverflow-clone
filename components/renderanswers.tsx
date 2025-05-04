'use client'
import { formatTimeToNow } from "@/lib/utils"
import Comment from "./comment"
import { UserAvatar } from "./useravatar"
import EditorOutput from "./editoroutput"
import { Icons } from "./icons"
import CheckAnswer from "./checkanswer"
import PostVote from "./postvote"
import { AnswerDetail } from "@/types/db"
import useAnswerReducer from "./answerprovider"
import { useSession } from "next-auth/react"
import { FC } from "react"
type RenderAnswerProps = {
    questionOwner:boolean
}
const RenderAnswer:FC<RenderAnswerProps> = ({questionOwner})=>{
    const{store} = useAnswerReducer();
    const session = useSession();
    return(
        <>
      <span className="text-xs text-zinc-400 font-semibold">Answers: {store?.length}</span>
      {store?.map((answer) => (
        <div className="flex flex-col my-3" key={answer.id}>
          <div className="flex gap-2">
            <div className="w-fit">
              <span className="text-xs text-zinc-500">
                {answer.votes.length} votes
              </span>
            </div>
          </div>
          <div className="flex">
            <div className="w-fit mb-5">
              <PostVote
                postId={answer.id}
                postedContent="answer"
                
                initialVote={
                  answer.votes.find((vote) => vote.userId === session.data?.user.id)?.type
                }
              />
              {questionOwner ? (
                <CheckAnswer checked={answer.isAnswer} answerId={answer.id} />
              ) : (
                answer.isAnswer && (
                  <Icons.check
                    className="items-center text-left text-green-600"
                    height="30"
                    width="30"
                  />
                )
              )}
            </div>
            <div className="md:w-full w-[300px]">
              {answer.isAi && <span className="text-lg font-extrabold my-3">AI generated</span>}
              <EditorOutput content={answer.content} />
            </div>
          </div>
          <div className="w-fit float-right self-end my-3 p-3">
            <span className="text-zinc-400">
              answered {formatTimeToNow(new Date(answer.postedDate))}{" "}
            </span>
            <div className="flex items-center  gap-2">
              <div className="w-fit">
                <UserAvatar user={answer.user} className="rounded-md" />
              </div>
              <div className="w-fit">
                <span className="text-xs text-zinc-600">
                  {answer.user.username}
                </span>
              </div>
            </div>
          </div>
          <hr />
          <Comment
            contentId={answer.id}
            type="answer"
            
          />
        </div>
      ))}
    </>
    )
}

export default RenderAnswer;