export enum ContextActionType {
    ChangeImage = "changeImage",
    ChangeFilter = "changeFilter",
}

export type ContextAction = {
    type: ContextActionType;
    payload?: any;
};

export type FilterName = "vintage" | "sepia" | "blur";

export type Filter = {
    name: FilterName;
    strength: number; // 0 to 100
};

export type ContextState = {
    image?: File;
    activeFilter?: Filter;
};

export type Context = {
    state?: ContextState;
    dispatch(action: any): void;
};
