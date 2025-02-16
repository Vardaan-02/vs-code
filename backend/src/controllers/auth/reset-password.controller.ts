import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import db from "../../db";
import { usersTable } from "../../db/schema";
import { eq } from "drizzle-orm";
import { config } from "../../config/config";

export const resetPassword = async (req: Request, res: Response):Promise<void> => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      res.status(400).json({ message: "Token and new password are required" });
      return;
    }

    let decoded;
    try {
      decoded = jwt.verify(token, config.JWT_EMAIL_SECRET) as { userId: string };
    } catch (error) {
      res.status(400).json({ message: "Invalid or expired token" });
      return;
    }

    const user = await db.select().from(usersTable).where(eq(usersTable.id, decoded.userId));

    if (!user.length) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await db
      .update(usersTable)
      .set({ password: hashedPassword })
      .where(eq(usersTable.id, decoded.userId));

    res.status(200).json({ message: "Password successfully reset" });
  } catch (error) {
    console.error("Reset Password Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
