import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { getUserid } from "../../../auth/user";
import { toastError } from "../../../../components/toast/toast";
const supabase = createPagesBrowserClient();

export async function createPage(
  title: string,
  subtitle: string,
  sectionid: number | null
) {
  if (sectionid === null) return;
  // !! 本当はurlはworkbook内での連番にしたかったが、製作時間がないため現在日時で仮に対応させる
  const url = Date.now();
  const userid = await getUserid();
  const { data, error } = await supabase
    .from("wb_pages")
    .insert({
      title: title,
      subtitle: subtitle,
      ownerid: userid,
      sectionid,
    })
    .select("id")
    .single();
  if (error) {
    console.error(error);
    toastError(error.message);
  }
  return data.id;
}

export async function getPageUniqueId(sectionid: string, url: string) {
  const { data, error } = await supabase
    .from("wb_pages")
    .select("id")
    .eq("sections", sectionid)
    .eq("url", url)
    .single();
  return data.id;
}

export async function getQuestionFromPageId(
  pageid: number,
  limit: number,
  page: number
) {
  const rangeoffset = (page - 1) * limit;
  const { data, error } = await supabase
    .from("wb_questions")
    .select("id, question, answer, explanation, internalid")
    .eq("pageid", pageid)
    .range(rangeoffset, rangeoffset + 49);
  if (error) console.error(error);
  return data;
}

export async function upsertQuestionFromPageId(pageid: number, data: any) {
  const dataInputed = (data) =>
    data.question || data.answer || data.explanation;
  data.forEach(function (obj) {
    obj.pageid = pageid;
  });
  let filteredArrayId = data.filter(function (obj) {
    return dataInputed(obj) && obj.id;
  });
  let filteredArrayNoneId = data.filter(function (obj) {
    return dataInputed(obj) && !obj.id;
  });
  console.log(filteredArrayId);
  const { data: data1, error: error1 } = await supabase
    .from("wb_questions")
    .upsert(filteredArrayId)
    .select();
  const { data: data2, error: error2 } = await supabase
    .from("wb_questions")
    .insert(filteredArrayNoneId)
    .select();
  return [...data1, ...data2];
}

export async function deleteQuestionFromId(id: number) {
  // この関数を利用するときは必ず事前に確認画面を表示しておくこと
  const { error } = await supabase.from("wb_questions").delete().eq("id", id);
  if (error) console.error;
}

export async function getAllQuestion(pageid: number | undefined) {
  if (pageid === undefined) return;
  const { data, error } = await supabase
    .from("wb_questions")
    .select("internalid, question")
    .eq("pageid", pageid);
  if (error) console.error(error);
  return data;
}

export async function markQuestion(pageid: number, internalid: number) {
  const { data, error } = await supabase
    .from("wb_questions")
    .select("answer, explanation")
    .eq("internalid", internalid)
    .eq("pageid", pageid)
    .single();
  if (error) console.error(error);
  return data;
}
