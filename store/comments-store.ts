import { CommentState } from "@/types/comment";

export enum Actions{
    "ADD",
    "REMOVE"
}

export type ActionType = {
    type:Actions,
    payload:CommentState
}
export default function commentStoreReducer(state:CommentState[], action:ActionType){
    switch (action.type) {
        case Actions.ADD:
            return [...state, action.payload];
        case Actions.REMOVE:
            state.pop();
            return state;   
        default:
            return state;
    }
}