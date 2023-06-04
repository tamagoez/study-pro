import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
const supabase = createPagesBrowserClient();

export default function Callback() {
  const router = useRouter();
  const [moveTo, setMoveTo] = useState("/dashboard");

  useEffect(() => {
    if (typeof router.query.moveTo === "string") {
      setMoveTo(router.query.moveTo);
    }
  }, [router.query.moveTo]);

  // onAuthStateChangeのコールバック関数
  const handleAuthStateChange = (event: string, session: any) => {
    if (event === "SIGNED_IN") {
      // ログイン時の処理
      location.replace(moveTo);
    }
  };

  useEffect(() => {
    // onAuthStateChangeの購読
    supabase.auth.onAuthStateChange(handleAuthStateChange);

    // コンポーネントのクリーンアップ時に購読解除
    return () => {};
  }, []);

  return (
    <>
      <p>少々お待ちください</p>
    </>
  );
}
