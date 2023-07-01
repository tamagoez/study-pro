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

export async function getSectionUniqueId(workbookid: string, url: string) {
  const { data, error } = await supabase
    .from("sections")
    .select("id")
    .eq("workbookid", workbookid)
    .eq("url", "url")
    .single();
  return data.id;
}

export async function getQuestionFromSectionId(
  sectionid: number,
  limit: number,
  page: number
) {
  const rangeoffset = (page - 1) * limit;
  const { data, error } = await supabase
    .from("questions")
    .select("id, question, answer, explanation, internalid")
    .eq("sectionid", sectionid)
    .range(rangeoffset, rangeoffset + 49);
  if (error) console.error(error);
  return data;
}

export async function upsertQuestionFromSectionId(
  sectionid: number,
  data: any
) {
  const dataInputed = (data) =>
    data.question || data.answer || data.explanation;
  data.forEach(function (obj) {
    obj.sectionid = sectionid;
  });
  let filteredArray = data.filter(function (obj) {
    return dataInputed(obj);
  });
  console.log(filteredArray);
  const { error } = await supabase.from("questions").upsert(filteredArray);
}
