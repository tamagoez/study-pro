import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
const supabase = createPagesBrowserClient();

export async function getUserid() {
  const user = (await supabase.auth.getUser()).data.user;
  return user.id;
}
