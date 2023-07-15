// pages/_app.js
import { useCallback, useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { AppProps } from "next/app";
import { Zen_Kaku_Gothic_New } from "next/font/google";
import ReactCMDK from "../components/react-cmdk";
import { useRouter } from "next/router";
import { ChakraProvider } from "@chakra-ui/react";
import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import { Analytics } from "@vercel/analytics/react";

import "react-toastify/dist/ReactToastify.css";
import { toastError, toastSuccess } from "../components/toast/toast";

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
  const supabase = createClientComponentClient();
  const router = useRouter();
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

  // useEffect(() => {
  //   const handleRouteChange = (url, { shallow }) => {
  //     console.log(
  //       `App is changing to ${url} ${
  //         shallow ? "with" : "without"
  //       } shallow routing`
  //     );
  //   };

  //   router.events.on("routeChangeStart", handleRouteChange);

  //   // If the component is unmounted, unsubscribe
  //   // from the event with the `off` method:
  //   return () => {
  //     router.events.off("routeChangeStart", handleRouteChange);
  //   };
  // }, [router]);

  // useEffect(() => {
  //   const handleNotificationResponse = async () => {
  //     if ("Notification" in window && "serviceWorker" in navigator) {
  //       const permission = await Notification.requestPermission();

  //       if (permission === "granted") {
  //         const registration = await navigator.serviceWorker.ready;
  //         const subscription = await registration.pushManager.subscribe({
  //           userVisibleOnly: true,
  //           applicationServerKey:
  //             "BCXhVNGYilUH9PLT_h5wocF1KqZlZt2pb2sNtlF65156zs1_zsoIbtOMKLVUJPR7PzfDLDWUSCyjs8J4LwOIxP4",
  //         });

  //         // toastSuccess("通知登録に成功しました!");
  //       } else if (permission === "denied") {
  //         toastError("通知登録に失敗しました");
  //       }
  //     }
  //   };

  //   handleNotificationResponse();
  // }, []);

  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}
    >
      <ReactCMDK
        open={cmdkOpen}
        setOpen={(newState) => setcmdkOpen(newState)}
      />
      <Toaster />
      <ToastContainer />
      <Analytics />
      <ChakraProvider>
        <div className={font.className}>
          <Component {...pageProps} />
        </div>
      </ChakraProvider>
    </SessionContextProvider>
  );
}
export default MyApp;
