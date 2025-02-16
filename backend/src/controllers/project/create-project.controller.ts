import { Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware";
import db from "../../db";
import { projectsTable, foldersTable } from "../../db/schema";

export const createProject = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { name, description } = req.body;
    const userId = req.user.userId;

    const [project] = await db
      .insert(projectsTable)
      .values({
        user_id: userId,
        name,
        description,
      })
      .returning();

    await db.insert(foldersTable).values({
      project_id: project.id,
      parent_folder_id: null,
      name: "/",
    });

    res.status(201).json({ success: true, project });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error creating project" });
  }
};
