"use client";

import { AppSidebar } from "@/components/app-sidebar";
import CondingArea from "@/components/coding-area";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useState } from "react";

export default function Page() {
  const [sidebarWidth, setSidebarWidth] = useState<number>(240);

  return (
    <SidebarProvider>
      <ResizablePanelGroup direction="horizontal" className="h-screen">
        <ResizablePanel
          defaultSize={14}
          minSize={14}
          onResize={(size) =>
            setSidebarWidth(Math.floor((size * window.innerWidth) / 100))
          }
        >
          <AppSidebar width={sidebarWidth} />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={86}>
          <ResizablePanelGroup direction="vertical">
            <SidebarInset>
              <header className="bg-[hsl(0,0%,8%)] flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                <div className="flex items-center gap-2 px-4">
                  <Separator orientation="vertical" className="mr-2 h-4" />
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink href="#">
                          Building Your Application
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator className="hidden md:block" />
                      <BreadcrumbItem>
                        <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>
              </header>
              <ResizablePanel defaultSize={75}>
                <CondingArea />
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={25}>
                <div className="flex h-full items-center justify-center p-6 bg-[hsl(0,0%,8%)]">
                  <span className="font-semibold">Terminal</span>
                </div>
              </ResizablePanel>
            </SidebarInset>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </SidebarProvider>
  );
}
