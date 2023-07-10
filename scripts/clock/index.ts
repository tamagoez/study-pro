import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { getUserid } from "../auth/user";
import { toastError } from "../../components/toast/toast";
import { calcTodayNumber } from "../../utils/datetime";
const supabase = createPagesBrowserClient();

export async function getIncompleteAndTodayTasks() {
  const userid = await getUserid();
  const today = calcTodayNumber(5);
  const { data, error } = await supabase
    .from("cl_tasks")
    .select("id, status, name, date, taketime")
    .eq("userid", userid)
    .lte("date", today);
  if (error) {
    console.error(error);
    toastError(error.message);
    return [];
  }
  return data;
}

export async function getTodayTasks() {
  const userid = await getUserid();
  const today = calcTodayNumber(5);
  const { data, error } = await supabase
    .from("cl_tasks")
    .select("id, status, name, date, taketime")
    .eq("userid", userid)
    .eq("date", today);
  if (error) {
    console.error(error);
    toastError(error.message);
    return [];
  }
  return data;
}

export async function getNowClock() {
  const userid = await getUserid();
  const { data, error } = await supabase
    .from("cl_clock")
    .select("studymin, breakmin")
    .eq("userid", userid)
    .single();
  if (error) {
    console.error(error);
    if (error.code === "PGRST116") {
      const { data: dataInsert, error: errorInsert } = await supabase
        .from("cl_clock")
        .insert({ userid })
        .select()
        .single();
      if (errorInsert) {
        console.error(error);
        toastError(error.message);
      }
      return dataInsert;
    } else {
      toastError(error.message);
      return;
    }
  }
  return data;
}
