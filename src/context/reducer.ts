import { INITIAL_STATE } from ".";
import { ContextAction, ContextActionType, ContextState } from "./types";

export const reducer = (
    state: ContextState = INITIAL_STATE,
    action: ContextAction
) => {
    const { type, payload } = action;
    switch (type) {
        case ContextActionType.ChangeImage:
            return {
                ...state,
            };

        case ContextActionType.ChangeFilter:
            return {
                ...state,
            };

        default:
            return state;
    }
};
