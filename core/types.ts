export type UUID = string;

export interface ToDo {
    id: UUID;
    date: string;
    content: string;
    done: boolean;
}
