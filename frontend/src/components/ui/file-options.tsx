import { SidebarMenuButton, SidebarMenuItem } from "./sidebar";
import { FileNode } from "@/types/folder-structure";
import { File } from "lucide-react";

export default function FileOption({ file }: { file: FileNode }) {
  return (
    <SidebarMenuItem
      // className={`${selectedFile === file.id && "bg-neutral-800 rounded-sm"}`}
    >
      <SidebarMenuButton tooltip={file.name}>
        <File />
        <p className="text-xs">{file.name}</p>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
