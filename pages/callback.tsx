import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Callback() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/dashboard")
  }, []);
  return (
    <>
      <p>You will be redirected soon</p>
    </>
  );
}
