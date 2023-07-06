import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { getUserid } from "../../auth/user";
import { toastError } from "../../../components/toast/toast";
const supabase = createPagesBrowserClient();

export async function createSection(
  title: string,
  subtitle: string,
  workbookid: number,
  subject: number
) {
  const userid = await getUserid();
  const { data, error } = await supabase
    .from("wb_sections")
    .insert({
      title: title,
      subtitle: subtitle,
      ownerid: userid,
      subject: subject,
      workbookid: workbookid,
    })
    .select("id")
    .single();
  if (error) {
    console.error(error);
    toastError(error.message);
  }
  return data.id;
}
