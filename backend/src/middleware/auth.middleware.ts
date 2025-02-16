import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/config";

export interface AuthRequest extends Request {
  user?: { userId: string } | any;
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
):void => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ message: "Unauthorized: No token provided" });
      return;
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, config.JWT_ACCESS_SECRET) as {
      userId: string;
    };
    req.user = { userId: decoded.userId };

    next();
  } catch (error) {
    console.error("Authentication Error:", error);
    res.status(403).json({ message: "Invalid or expired token" });
    return;
  }
};
