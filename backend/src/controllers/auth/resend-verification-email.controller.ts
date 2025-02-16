import { Request, Response } from "express";

export const resendVerificationEmail = (req: Request, res: Response) => {
  res.status(200).send("Hello asdf");
};
