import { useRouter } from "next/router";
import { useEffect } from "react";

import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
const supabase = createPagesBrowserClient();

export default function Callback() {
  const router = useRouter();

  // 正直ChatGPTに直してもらった
  useEffect(() => {
    let redirecturl = "/dashboard";
    if (typeof window !== "undefined" && localStorage.getItem("moveto")) {
      redirecturl = localStorage.getItem("moveto");
    }
    localStorage.removeItem("moveto");
    let isTabMoved = false;
    const handleTabMove = () => {
      isTabMoved = true;
    };
    window.addEventListener("beforeunload", handleTabMove);
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        window.removeEventListener("beforeunload", handleTabMove);
        if (!isTabMoved) {
          location.replace(redirecturl);
        }
      }
    });
    return () => {
      window.removeEventListener("beforeunload", handleTabMove);
    };
  }, []);

  return (
    <>
      <p>少々お待ちください</p>
    </>
  );
}
