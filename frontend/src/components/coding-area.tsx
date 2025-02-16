"use client";

import Editor from "@monaco-editor/react";
import { useState } from "react";

export default function CondingArea() {
  const [code, setCode] = useState<string>("");
  const [language] = useState<string>("cpp");

  return (
    <div className="h-full relative">
      <div className="bg-[hsl(0,0%,12%)] p-2 flex gap-4"></div>
      <Editor
        height="100%"
        width="100%"
        defaultLanguage={language}
        theme="vs-dark"
        value={code}
        onChange={(value) => setCode(value || "")}
      />
    </div>
  );
}
