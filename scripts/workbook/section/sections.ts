import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
const supabase = createPagesBrowserClient();

export async function fetchSections(workbookid: string) {
  const user = (await supabase.auth.getUser()).data.user;
  const { data, error } = await supabase
    .from("sections")
    .select("id, url, workbookid, ownerid, title, subtitle, subject")
    .eq("workbookid", workbookid);
  if (error) {
    console.log(error);
    return [];
  }
  return data;
}
