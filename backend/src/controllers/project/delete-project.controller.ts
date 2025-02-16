import { Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware";
import { projectsTable } from "../../db/schema";
import { eq } from "drizzle-orm";
import db from "../../db";

export const deleteProject = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const projectId = req.params.id;

    await db.delete(projectsTable).where(eq(projectsTable.id, projectId));

    res.json({ success: true, message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error deleting project" });
  }
};
