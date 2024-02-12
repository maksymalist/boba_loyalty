import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    console.log(req.body);
    return res.status(200).json({ message: "Hello" });
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
