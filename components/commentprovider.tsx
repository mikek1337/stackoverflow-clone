"use client"
import commentStoreReducer, { ActionType } from "@/store/comments-store"
import { CommentState } from "@/types/comment"
import { createContext, Dispatch, useContext, useReducer } from "react"

type CommentProviderProps = {
    children:React.ReactNode,
    initalState: CommentState[]
}
type ContextType={
    store:CommentState[],
    dispatch: Dispatch<ActionType>
}
const CommentStoreContext = createContext<ContextType>({} as ContextType);
export function CommentProvider({children, initalState}:CommentProviderProps){
    const[store, dispatch] = useReducer(commentStoreReducer, initalState)
    return(
        <CommentStoreContext.Provider value={{store, dispatch}}>
            {children}
        </CommentStoreContext.Provider>
    )
}

export default function useCommentReducer(){
    try{
        return useContext(CommentStoreContext)
    }catch(err){
        throw "Out of context";
    }
}