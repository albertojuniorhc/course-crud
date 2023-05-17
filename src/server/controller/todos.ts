import { NextApiRequest, NextApiResponse } from "next";
import { read } from "@db-crud-todo";

function get(req: NextApiRequest, res: NextApiResponse) {
    const toDos = read();
    res.status(200).json({ toDos });
}

export const toDoController = { get };
