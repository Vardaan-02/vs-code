"use client";

import { Button } from "@/components/ui/button";
import { useAccessToken } from "@/store/access-token";

export default function Page() {
  const token = useAccessToken((state) => state.accessToken);

  const click = () => {
    console.log(token);
    console.log(useAccessToken.getState().accessToken)
  };

  return <Button onClick={click}>Click</Button>;
}
