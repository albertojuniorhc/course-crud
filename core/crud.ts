import fs from "fs";
console.clear();

const DB_FILE_PATH = "./core/db";

const writeFS = fs.writeFileSync;
const readFS = fs.readFileSync;

interface ToDo {
  date: string;
  content: string;
  done: boolean;
}

function CLEAR_DB() {
  writeFS(DB_FILE_PATH, "");
}

function create(content: string) {
  const toDo: ToDo = {
    date: new Date().toISOString(),
    content,
    done: false,
  };

  const toDoList: Array<ToDo> = [...read(), toDo];

  writeFS(DB_FILE_PATH, JSON.stringify({ toDoList }, null, 2));
  return content;
}

function read(): Array<ToDo> {
  const dbString = readFS(DB_FILE_PATH, "utf-8");
  const db = JSON.parse(dbString || "{}");

  if (!db.toDoList) return [];

  return db.toDoList;
}

//Simulation
CLEAR_DB();
create("1st ToDo - CRUD");
create("2nd ToDo - CRUD");
console.log(read());
