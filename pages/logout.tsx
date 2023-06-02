import { useEffect } from "react";
import { signOut } from "../scripts/auth/page";

export default function () {
  async function signOutAsync() {
    const res = await signOut();
    if (res === true) {location.replace("/")}
  }
  useEffect(() => {
    signOutAsync();
  }, []);
  return (
    <>
      <p>少々お待ちください</p>
    </>
  );
}
