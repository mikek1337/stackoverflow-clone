import AnswerStoreReducer, { ActionType } from "@/store/answers-store"
import { Answer } from "@/types/answer"
import { AnswerDetail } from "@/types/db"
import { createContext, Dispatch, useContext, useReducer } from "react"

type AnswerProviderProps = {
    children:React.ReactNode
    initialState:any[]
}
type AnswerContextType = {
    store: Answer[],
    dispatch:Dispatch<ActionType>
}
const AnswerContext = createContext<AnswerContextType>({} as AnswerContextType);
export function AnswerProvider({children, initialState}:AnswerProviderProps){
    const [store, dispatch] = useReducer(AnswerStoreReducer,initialState);
    return (
        <AnswerContext.Provider value={{store, dispatch}}>
            {children}
        </AnswerContext.Provider>
    )

}

export default function useAnswerReducer(){
    const context = useContext(AnswerContext);
    if(!context)
    {
        throw new Error("context out of bound");
    }
    return context;
}