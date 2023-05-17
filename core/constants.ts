import fs from "fs";

export const DB_FILE_PATH = "./core/db";
export const writeFS = fs.writeFileSync;
export const readFS = fs.readFileSync;

export const texts = {
    toDoNotFound: "ToDo not found",
};
