import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { getUserid } from "../auth/user";
const supabase = createPagesBrowserClient();

export async function createWorkbook(title: string, subtitle: string) {
  const userid = getUserid();
  const { data, error } = await supabase
    .from("workbooks")
    .insert({ title: title, subtitle: subtitle, ownerid: userid })
    .select("id")
    .single();
  return data.id;
}
