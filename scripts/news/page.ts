import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { toastError } from "../../components/toast/toast";
const supabase = createPagesBrowserClient();
export async function fetchNewsContent(id: number | undefined) {
  if (id === undefined) return;
  const { data, error } = await supabase
    .from("news")
    .select("title, created_at, content")
    .eq("id", id)
    .single();
  if (error) {
    console.log(error);
    toastError(error.message);
    return;
  }
  return data;
}
