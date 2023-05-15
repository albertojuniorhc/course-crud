import fs from "fs";
import { v4 as uuid } from "uuid";

const DB_FILE_PATH = "./core/db";
const writeFS = fs.writeFileSync;
const readFS = fs.readFileSync;

type UUID = string;

interface ToDo {
  id: UUID;
  date: string;
  content: string;
  done: boolean;
}

function CLEAR_DB() {
  writeFS(DB_FILE_PATH, "");
}

function WRITE_DB(toDoList: Array<ToDo>): void {
  writeFS(DB_FILE_PATH, JSON.stringify({ toDo: toDoList }, null, 2));
}

function create(content: string): ToDo {
  const toDo: ToDo = {
    id: uuid(),
    date: new Date().toISOString(),
    content,
    done: false,
  };

  const toDoList: Array<ToDo> = [...read(), toDo];

  WRITE_DB(toDoList);
  return toDo;
}

function read(): Array<ToDo> {
  const dbString = readFS(DB_FILE_PATH, "utf-8");
  const db = JSON.parse(dbString || "{}");

  if (!db.toDo) return [];

  return db.toDo;
}

function update(id: UUID, partialToDo: Partial<ToDo>): ToDo {
  let updatedToDo: ToDo | undefined;
  const toDoList = read();

  toDoList.forEach((toDo) => {
    if (toDo.id === id) {
      updatedToDo = Object.assign(toDo, partialToDo);
    }
  });

  if (!updatedToDo) throw new Error("ToDo not found");

  WRITE_DB(toDoList);
  return updatedToDo;
}

function updateContentById(id: UUID, content: string): ToDo {
  return update(id, { content });
}

function deleteById(id: UUID): void {
  const toDoList = read();
  const filteredToDoList = toDoList.filter((toDo) => toDo.id !== id);
  WRITE_DB(filteredToDoList);
}

//Simulation
CLEAR_DB();
create("1st ToDo");
create("2nd ToDo");
const toDoUpdate = create("3nd ToDo");
create("4nd ToDo");

setTimeout(() => {
  update(toDoUpdate.id, { done: true });
}, 1000);

setTimeout(() => {
  updateContentById(toDoUpdate.id, "This is an updated ToDo");
}, 2000);

setTimeout(() => {
  deleteById(toDoUpdate.id);
}, 3000);

console.log(read());
