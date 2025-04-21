'use client'
import { AnswerCreationRequest } from "@/lib/validators/post"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { FC, useEffect } from "react"
import { Button } from "../ui/button"
import { Loader, Send } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"


type PostAiAnswer = {
    content: any,
    questionId: string
}
export const PostAIAnswer: FC<PostAiAnswer> = ({ content, questionId }) => {
    const router = useRouter();
    const { isLoading: isPosting, mutate: post, isError, isSuccess } = useMutation({
        mutationFn: async (postAnswer: AnswerCreationRequest) => {
            const res = await axios.post('/api/answer/post', postAnswer);
            return res
        }
    })
    useEffect(() => {
        if (isSuccess) {
            toast({ title: 'Answer posted', description: 'Successfully', variant: 'default' });
            router.refresh();
        }
        if (isError) toast({ title: 'Error', description: 'Something went wrong. Please try again!', variant: 'destructive' })
    }, [isSuccess, isError])
    const postAiAnswer = () => {
        post({ questionId, content, isAi: true });
    }
    return (
        <div className="w-full flex justify-end">
            <Button className="w-fit gap-2 items-center" onClick={postAiAnswer}>{!isPosting ? <Send className="w-5 h-5" /> : <Loader className="w-5 h-5 animate-spin" />} Post this</Button>
        </div>
    )
}