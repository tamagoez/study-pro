import { useRouter } from "next/router";
import { useEffect } from "react";

import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
const supabase = createPagesBrowserClient();

export default function Callback() {
  const router = useRouter();
  let redirecturl = "/dashboard";

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      sessionStorage.getItem("moveto") != "null"
    ) {
      redirecturl = sessionStorage.getItem("moveto");
    }
    sessionStorage.removeItem("moveto");
    supabase.auth.onAuthStateChange((event, session) => {
      if (event == "SIGNED_IN") location.replace("/dashboard");
    });
  }, []);
  return (
    <>
      <p>StudySharpへようこそ!</p>
    </>
  );
}
