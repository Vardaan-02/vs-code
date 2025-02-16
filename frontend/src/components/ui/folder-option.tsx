import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { SidebarMenuButton, SidebarMenuItem, SidebarMenuSub } from "./sidebar";
import { ChevronRight } from "lucide-react";
import { FolderTreeNode } from "@/types/folder-structure";
import FileOption from "./file-options";

export default function FolderOption({ folder }: { folder: FolderTreeNode }) {
  return (
    <Collapsible key={folder.id} asChild defaultOpen={false}>
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            tooltip={folder.name}
            // className={`${
            //   selectedFolder === folder.id && "bg-neutral-800 rounded-sm"
            // }`}
          >
            <ChevronRight className={`transition-transform duration-200`} />
            {/* ${openFolders.includes(folder.id) && "rotate-90"} */}
            <span>{folder.name}</span>
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {/* {(addFolder === folder.id || addFile === folder.id) && (
              <input
                onChange={(e) => setName(e.target.value)}
                className="outline-none bg-[hsl(0,0%,12%)] ml-4 mt-1 px-2 py-1 text-sm rounded-sm"
                ref={inputRef}
              />
            )} */}
            {folder.children.map((child) => {
              return <FolderOption key={child.id} folder={child} />;
            })}
            {folder.files.map((child) => {
              return <FileOption key={child.id} file={child} />;
            })}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}
