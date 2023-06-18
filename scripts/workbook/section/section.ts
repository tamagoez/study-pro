import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { getUserid } from "../../auth/user";
import { toastError } from "../../../components/toast/toast";
const supabase = createPagesBrowserClient();

export async function createSection(
  title: string,
  subtitle: string,
  workbookid: string,
  subject: number
) {
  // !! 本当はurlはworkbook内での連番にしたかったが、製作時間がないため現在日時で仮に対応させる
  const url = Date.now();
  const userid = await getUserid();
  const { data, error } = await supabase
    .from("sections")
    .insert({
      title: title,
      subtitle: subtitle,
      ownerid: userid,
      workbookid,
      url,
      subject,
    })
    .select("url")
    .single();
  if (error) {
    console.error(error);
    toastError(error.message);
  }
  return data.url;
}
