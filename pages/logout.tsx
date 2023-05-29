import { useEffect } from "react";
import { signOut } from "../scripts/auth/page";

export default function () {
  useEffect(() => {
    signOut();
  }, []);
  return (
    <>
      <p>Please wait...</p>
    </>
  );
}
