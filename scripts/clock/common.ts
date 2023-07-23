import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { getUserid } from "../auth/user";
import { toastError, toastSuccess } from "../../components/toast/toast";
const supabase = createPagesBrowserClient();

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

export async function getGoalMinute() {
  const userid = await getUserid();
  const { data, error } = await supabase
    .from("cl_goal")
    .select("studymin, breakmin")
    .eq("userid", userid)
    .single();
  if (error) {
    console.error(error);
    if (error.code === "PGRST116") {
      const { data: dataInsert, error: errorInsert } = await supabase
        .from("cl_goal")
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
  if (typeof window !== "undefined") {
    localStorage.setItem("goal_studymin", data.studymin);
    localStorage.setItem("goal_breakmin", data.breakmin);
  }
  return data;
}
