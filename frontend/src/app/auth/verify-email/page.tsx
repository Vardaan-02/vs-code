"use client";

import { Button } from "@/components/ui/button";
import BlockSwapLoader from "@/components/ui/loader";
import { useHandleEmailVerification } from "@/mutations/auth/verify-email";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const { mutateAsync, isPending, error } = useHandleEmailVerification();

  useEffect(() => {
    if (!token) return;
    mutateAsync(token);
  }, [token, mutateAsync]);

  return (
    <div className="h-screen w-screen flex flex-col gap-16 justify-center items-center text-2xl font-semibold">
      {isPending ? (
        <BlockSwapLoader />
      ) : error ? (
        <p>Email Verification Failed</p>
      ) : (
        <p>Email Verified</p>
      )}
      <Link href={"/"}>
        <Button variant={"success"}>Home</Button>
      </Link>
    </div>
  );
}
