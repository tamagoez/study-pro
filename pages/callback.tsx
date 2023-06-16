import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";

const supabase = createPagesBrowserClient();

export default function Callback() {
  const router = useRouter();
  const [moveTo, setMoveTo] = useState("/dashboard");
  const { query, isReady } = useRouter();

  // onAuthStateChangeのコールバック関数
  const handleAuthStateChange = (event: string, session: any) => {
    if (event === "SIGNED_IN") {
      // ログイン時の処理
      location.replace(moveTo);
    }
  };

  useEffect(() => {
    if (typeof query.moveTo === "string") {
      setMoveTo(query.moveTo);
    }
    console.log(moveTo);
    supabase.auth.onAuthStateChange(handleAuthStateChange);
  }, [isReady, query.moveTo]);

  return (
    <>
      <p>少々お待ちください</p>
      リダイレクトされない場合は<a href="/dashboard">ここをクリック</a>
    </>
  );
}
