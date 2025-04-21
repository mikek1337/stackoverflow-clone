import { formatTimeToNow } from "@/lib/utils";
import useCommentReducer from "./commentprovider"

const RenderComment = () =>{
    const {store} = useCommentReducer();
    return(
        <>
        {store?.map((comment) => (
                <div key={comment.id} className="text-xs ">
                  <hr className="my-2" />
                  <p className="w-full pl-10">
                    {comment.comment}
                    {" - "}
                    {comment.user.username}{" "}
                    {formatTimeToNow(new Date(comment.postedDate))}
                  </p>
                </div>
              ))}
        </>
    )
}

export default RenderComment;