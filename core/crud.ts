import { v4 as uuid } from "uuid";
import { DB_FILE_PATH, readFS, texts, writeFS } from "./constants";
import type { TUUID, TToDo } from "./types";

function CLEAR_DB() {
    writeFS(DB_FILE_PATH, "");
}

function WRITE_DB(toDoList: TToDo[]): void {
    writeFS(DB_FILE_PATH, JSON.stringify({ toDo: toDoList }, null, 2));
}

function create(content: string): TToDo {
    const toDo: TToDo = {
        id: uuid(),
        date: new Date().toISOString(),
        content,
        done: false,
    };

    const toDoList: TToDo[] = [...read(), toDo];

    WRITE_DB(toDoList);
    return toDo;
}

export function read(): TToDo[] {
    const dbString = readFS(DB_FILE_PATH, "utf-8");
    const db = JSON.parse(dbString || "{}");

    if (!db.toDo) return [];

    return db.toDo;
}

function update(id: TUUID, partialToDo: Partial<TToDo>): TToDo {
    let updatedToDo: TToDo | undefined;
    const toDoList = read();

    toDoList.forEach((toDo) => {
        if (toDo.id === id) {
            updatedToDo = Object.assign(toDo, partialToDo);
        }
    });

    if (!updatedToDo) throw new Error(texts.toDoNotFound);

    WRITE_DB(toDoList);
    return updatedToDo;
}

function updateContentById(id: TUUID, content: string): TToDo {
    return update(id, { content });
}

function deleteById(id: TUUID): void {
    const toDoList = read();
    const filteredToDoList = toDoList.filter((toDo) => toDo.id !== id);
    WRITE_DB(filteredToDoList);
}

//Simulation

const enableSimulation = false;

if (enableSimulation) {
    CLEAR_DB();
    const toDoDescriptions: string[] = [
        "1st ToDo",
        "2nd ToDo",
        "3rd ToDo",
        "4th ToDo",
        "5th ToDo:",
        "6th ToDo:",
        "7th ToDo:",
        "8th ToDo:",
        "9th ToDo:",
        "10th ToDo:",
    ];

    toDoDescriptions.forEach((description) => {
        create(description);
    });

    // const toDoUpdate = create("This is a ToDo to update");

    // setTimeout(() => {
    //     update(toDoUpdate.id, { done: true });
    // }, 1000);

    // setTimeout(() => {
    //     updateContentById(toDoUpdate.id, "This is an updated ToDo");
    // }, 2000);

    // setTimeout(() => {
    //     deleteById(toDoUpdate.id);
    // }, 3000);

    console.log(read());
}
