import { texts } from "@server/constants";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: texts.methodNotAllowed });
    }

    return res
        .status(200)
        .json({ name: "API Index - CRUD", request: req.headers });
}
