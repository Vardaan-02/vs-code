import { Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware";
import db from "../../db";
import { usersTable } from "../../db/schema";
import { eq } from "drizzle-orm";

export const getMe = async (req: AuthRequest, res: Response):Promise<void> => {
  try {
    if (!req.user?.userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, req.user!.userId));

    if (!user.length) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const { id, username, email, created_at } = user[0];

    res.status(200).json({ id, username, email, created_at });
  } catch (error) {
    console.error("Me Route Error:", error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};
