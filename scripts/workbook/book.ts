import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { getUserid } from "../auth/user";
import { toastError } from "../../components/toast/toast";
const supabase = createPagesBrowserClient();

export async function createWorkbook(title: string, subtitle: string) {
  const userid = await getUserid();
  const { data, error } = await supabase
    .from("wb_books")
    .insert({ title: title, subtitle: subtitle, ownerid: userid })
    .select("id")
    .single();
  if (error) {
    console.error(error);
    toastError(error.message);
  }
  return data.id;
}
