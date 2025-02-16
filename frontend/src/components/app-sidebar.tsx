"use client";

import * as React from "react";
import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { FilePlus, FolderPlus } from "lucide-react";

export function AppSidebar({
  width,
  ...props
}: React.ComponentProps<typeof Sidebar> & { width: number }) {
  return (
    <Sidebar collapsible="icon" {...props} style={{ width: `${width}px` }}>
      <SidebarHeader className="bg-[hsl(0,0%,8%)]">
        <div className="pt-4 mx-4 flex justify-between">
          <p className="text-xs font-semibold">EXPLORER</p>
          <div className="flex items-center gap-2">
            <FilePlus
              className="w-4 h-4 cursor-pointer"
              aria-label="Add File"
            />
            <FolderPlus
              className="w-4 h-4 cursor-pointer"
              aria-label="Add Folder"
            />
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-[hsl(0,0%,8%)]">
        <NavMain />
      </SidebarContent>
    </Sidebar>
  );
}
