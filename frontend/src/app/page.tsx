import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function Page() {
  return (
    <div className="justify-center items-center w-screen h-screen flex gap-96">
      <Link href={"/auth/login"}>
        <Button>Login</Button>
      </Link>
      <Link href={"/auth/sign-up"}>
        <Button>SignUp</Button>
      </Link>
      <Link href={"/auth/change-password"}>
        <Button>Change Password</Button>
      </Link>
    </div>
  );
}
