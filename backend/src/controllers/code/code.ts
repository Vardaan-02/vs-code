import { Request, Response } from "express";

export const code = (req: Request, res: Response) => {
  res.status(200).send("Hello asdf");
};
