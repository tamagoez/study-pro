import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
const supabase = createPagesBrowserClient();

export async function fetchMyWorkbooks() {
  const user = (await supabase.auth.getUser()).data.user;
  const { data, error } = await supabase
    .from("workbooks")
    .select("id, ownerid, title, subtitle, subject")
    .eq("ownerid", user.id);
  if (error) {
    console.log(error);
    return [];
  }
  return data;
}
