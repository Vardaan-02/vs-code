import { Response } from "express";
import bcrypt from "bcryptjs";
import db from "../../db";
import { usersTable } from "../../db/schema";
import { eq } from "drizzle-orm";
import { AuthRequest } from "../../middleware/auth.middleware";

export const changePassword = async (req: AuthRequest, res: Response):Promise<void> => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!req.user?.userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    if (!oldPassword || !newPassword) {
      res.status(400).json({ message: "Old and new passwords are required" });
      return;
    }

    const user = await db.select().from(usersTable).where(eq(usersTable.id, req.user.userId));

    if (!user.length) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const isMatch = await bcrypt.compare(oldPassword, user[0].password);
    if (!isMatch) {
      res.status(400).json({ message: "Incorrect old password" });
      return;
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await db
      .update(usersTable)
      .set({ password: hashedPassword })
      .where(eq(usersTable.id, req.user.userId));

    res.status(200).json({ message: "Password successfully changed" });
    return;
  } catch (error) {
    console.error("Change Password Error:", error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};
