import { Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware";
import db from "../../db";
import { projectsTable } from "../../db/schema";
import { eq } from "drizzle-orm";

export const getAllProjects = async (req: AuthRequest, res: Response):Promise<void> => {
  try {
    const userId = req.user.userId;
    const projects = await db
      .select()
      .from(projectsTable)
      .where(eq(projectsTable.user_id, userId));

    res.json({ success: true, projects });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching projects" });
  }
};
