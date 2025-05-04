import { Answer } from "@/types/answer"

export enum Actions{
    "ADD",
    "REMOVE"
}

export type ActionType={
    type:Actions,
    payload:Answer
}

export default function AnswerStoreReducer(state:Answer[], action:ActionType){
    switch (action.type) {
        case Actions.ADD:
            return [...state, action.payload];
        case Actions.REMOVE:
            state.pop();
            return state
        default:
            return state
    }

}
