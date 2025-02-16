import { eq } from "drizzle-orm";
import { filesTable, foldersTable, projectsTable } from "../../db/schema";
import db from "../../db";
import { AuthRequest } from "../../middleware/auth.middleware";
import { Response } from "express";

interface FolderTreeNode {
  id: string;
  name: string;
  parent_folder_id?: string | null;
  project_id: string;
  created_at: Date;
  updated_at: Date;
  children: FolderTreeNode[];
  files: FileNode[];
  node_type: "Folder";
}

interface FileNode {
  id: string;
  name: string;
  parent_folder_id: string | null;
  project_id: string;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
  node_type: "File";
}

export const getProject = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const projectId = req.params.id;

    const project = await db
      .select()
      .from(projectsTable)
      .where(eq(projectsTable.id, projectId))
      .limit(1);

    if (!project.length) {
      res.status(404).json({ success: false, message: "Project not found" });
      return;
    }

    const folders = await db
      .select()
      .from(foldersTable)
      .where(eq(foldersTable.project_id, projectId));

    const files = await db
      .select()
      .from(filesTable)
      .where(eq(filesTable.project_id, projectId));

    const folderMap: Record<string, FolderTreeNode> = {};
    folders.forEach((folder) => {
      folderMap[folder.id] = {
        id: folder.id,
        name: folder.name,
        parent_folder_id: folder.parent_folder_id,
        project_id: folder.project_id,
        created_at: folder.created_at,
        updated_at: folder.updated_at,
        children: [],
        files: [],
        node_type: "Folder",
      };
    });

    files.forEach((file) => {
      const fileNode: FileNode = {
        id: file.id,
        name: file.name,
        parent_folder_id: file.parent_folder_id,
        project_id: file.project_id,
        created_at: file.created_at,
        updated_at: file.updated_at,
        is_active: false,
        node_type: "File",
      };

      if (file.parent_folder_id && folderMap[file.parent_folder_id]) {
        folderMap[file.parent_folder_id].files.push(fileNode);
      }
    });

    const rootFolders: FolderTreeNode[] = [];
    folders.forEach((folder) => {
      if (folder.parent_folder_id) {
        folderMap[folder.parent_folder_id]?.children.push(folderMap[folder.id]);
      } else {
        rootFolders.push(folderMap[folder.id]);
      }
    });

    res.json({
      success: true,
      project: project[0],
      folders: rootFolders,
    });
  } catch (err) {
    console.error("Error fetching project details:", err);
    res.status(500).json({ success: false, message: "Error fetching project details" });
  }
};
