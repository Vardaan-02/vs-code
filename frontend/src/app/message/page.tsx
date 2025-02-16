"use client";

import { Button } from "@/components/ui/button";
import { useLastMessage } from "@/store/last-message";
import Link from "next/link";

export default function Page() {
  const message = useLastMessage((state) => state.lastMessage);

  console.log(message);

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <p className="text-2xl font-semibold">{message}</p>
      <Link href={"/"}><Button variant={"success"}>Home</Button></Link>
    </div>
  );
}
