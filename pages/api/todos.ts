import { toDoController } from "@server/controller/todos";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        toDoController.get(req, res);
        return;
    }

    return res.status(405).json({ message: "Method not allowed" });
}
