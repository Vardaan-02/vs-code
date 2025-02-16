export type FolderTreeNode = {
  id: string;
  name: string;
  parent_folder_id?: string | null;
  project_id: string;
  created_at: Date;
  updated_at: Date;
  children: FolderTreeNode[];
  files: FileNode[];
  node_type: "Folder";
};

export type FileNode = {
  id: string;
  name: string;
  type: string;
  project_id: string;
  parent_folder_id?: string | null;
  created_at: Date;
  updated_at: Date;
  node_type: "File";
};
