export type TUUID = string;

export interface TToDo {
    id: TUUID;
    date: string;
    content: string;
    done: boolean;
}
