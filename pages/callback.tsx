import { useRouter } from "next/router";
import { useEffect } from "react";

import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
const supabase = createPagesBrowserClient();

export default function Callback() {
  const router = useRouter();

  useEffect(() => {
    let redirecturl = "/dashboard";
    // 正直useEffect内だったらwindows typeofチェックいらないと思う
    if (typeof window !== "undefined" && localStorage.getItem("moveto")) {
      redirecturl = localStorage.getItem("moveto");
    }
    localStorage.removeItem("moveto");
    supabase.auth.onAuthStateChange((event, session) => {
      if (event == "SIGNED_IN") location.replace(redirecturl);
    });
  }, []);

  return (
    <>
      <p>少々お待ちください</p>
    </>
  );
}
