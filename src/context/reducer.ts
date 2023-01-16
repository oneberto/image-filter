import { INITIAL_STATE } from ".";
import { ContextAction, ContextActionType, ContextState } from "./types";

export const reducer = (
    state: ContextState = INITIAL_STATE,
    action: ContextAction
): ContextState => {
    const { type, payload } = action;
    switch (type) {
        case ContextActionType.ChangeImage:
            const previewImageURL = URL.createObjectURL(payload as File);

            return {
                ...state,
                previewImageURL,
                image: payload,
            };

        case ContextActionType.ChangeFilter:
            return {
                ...state,
            };

        default:
            return state;
    }
};
