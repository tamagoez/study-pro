import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
const supabase = createPagesBrowserClient();

export async function fetchPages(sectionid: number | undefined) {
  if (sectionid === undefined) return;
  const user = (await supabase.auth.getUser()).data.user;
  const { data, error } = await supabase
    .from("wb_pages")
    .select("id, sectionid, ownerid, title, subtitle")
    .eq("sectionid", sectionid);
  if (error) {
    console.log(error);
    return [];
  }
  return data;
}
