// pages/_app.js
import { useCallback, useEffect, useState } from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { AppProps } from "next/app";
import { Zen_Kaku_Gothic_New } from "next/font/google";
import ReactCMDK from "../components/react-cmdk";

// import "../styles/cmdk.scss";

const font = Zen_Kaku_Gothic_New({
  weight: ["500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) {
  const [supabase] = useState(() => createBrowserSupabaseClient());

  const [cmdkOpen, setcmdkOpen] = useState(false);

  // Toggle the menu when ⌘K is pressed
  const down = useCallback(
    (e) => {
      if (e.key === "k" && e.ctrlKey) {
        e.preventDefault();
        setcmdkOpen((cmdkOpen) => !cmdkOpen);
        console.log(cmdkOpen);
      }
    },
    [setcmdkOpen]
  );

  useEffect(() => {
    document.addEventListener("keydown", down, false);
    return () => {
      document.removeEventListener("keydown", down, false);
    };
  }, [down]);

  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}
    >
      <ReactCMDK
        open={cmdkOpen}
        setOpen={(newState) => setcmdkOpen(newState)}
      />
      <div className={font.className}>
        <Component {...pageProps} />
      </div>
    </SessionContextProvider>
  );
}
export default MyApp;
