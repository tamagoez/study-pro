// 名前: ServerPost.tsx
// 機能: Service Worker関連のデータをSupabaseにPOSTします
// 追記事項: ユーザーがログインしていない場合はこの機能を使用することはできません

import { useState, useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";

// メモ: Supabase関連の処理はこのなかで全て完結させたいので、引数ではuseridを受け付けず、内部で取得するようにする
export async function insertSWPush(metadata: any) {
  const supabase = useSupabaseClient();
  const user = useUser();
  try {
    const { error } = await supabase
      .from("supabase")
      .insert({ userid: user.id, metadata });
  } catch (error) {
    console.error(error);
  }
}
