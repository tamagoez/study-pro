import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { toastError } from "../../components/toast/toast";
const supabase = createPagesBrowserClient();

export async function fetchNewsList() {
  const { data, error } = await supabase
    .from("news")
    .select("id, title, created_at");
  if (error) {
    console.log(error);
    toastError(error.message);
    return [];
  }
  return data;
}
