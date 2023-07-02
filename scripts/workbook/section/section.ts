import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { getUserid } from "../../auth/user";
import { toastError } from "../../../components/toast/toast";
const supabase = createPagesBrowserClient();

export async function createSection(
  title: string,
  subtitle: string,
  workbookid: number | null,
  subject: number
) {
  if (workbookid === null) return;
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
  let filteredArrayId = data.filter(function (obj) {
    return dataInputed(obj) && obj.id;
  });
  let filteredArrayNoneId = data.filter(function (obj) {
    return dataInputed(obj) && !obj.id;
  });
  console.log(filteredArrayId);
  const { data: data1, error: error1 } = await supabase
    .from("questions")
    .upsert(filteredArrayId)
    .select();
  const { data: data2, error: error2 } = await supabase
    .from("questions")
    .insert(filteredArrayNoneId)
    .select();
  return [...data1, ...data2];
}

export async function deleteQuestionFromId(id: number) {
  // この関数を利用するときは必ず事前に確認画面を表示しておくこと
  const { error } = await supabase.from("questions").delete().eq("id", id);
  if (error) console.error;
}

export async function getAllQuestion(sectionid: number) {
  const { data, error } = await supabase
    .from("questions")
    .select("internalid, question")
    .eq("sectionid", sectionid);
  if (error) console.error(error);
  return data;
}

export async function markQuestion(sectionid: string, internalid: string) {
  const { data, error } = await supabase
    .from("questions")
    .select("answer, explanation")
    .eq("internalid", internalid)
    .eq("sectionid", sectionid)
    .single();
  if (error) console.error(error);
  return data;
}
