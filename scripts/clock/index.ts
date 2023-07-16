import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { getUserid } from "../auth/user";
import { toastError, toastSuccess } from "../../components/toast/toast";
import { calcDateToNumber, calcTodayNumber } from "../../utils/datetime";
const supabase = createPagesBrowserClient();

export async function getIncompleteAndTodayTasks() {
  const userid = await getUserid();
  const today = calcTodayNumber(5);
  const { data, error } = await supabase
    .from("cl_tasks")
    .select("id, status, name, date, taketime")
    .eq("userid", userid)
    .eq("status", false);
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

export async function addClockTask(
  name: string | undefined,
  taketime: number | undefined,
  date: string | undefined
) {
  if (name === undefined || taketime === undefined || date === undefined)
    return {};
  const userid = await getUserid();
  const parsedDate = calcDateToNumber(date);
  const { data, error } = await supabase
    .from("cl_tasks")
    .insert({ userid, name, taketime, date: parsedDate, status: false })
    .select()
    .single();
  if (error) {
    console.error(error);
    toastError("タスクの追加中にエラーが発生しました");
    return {};
  } else {
    toastSuccess("タスクが追加できました!<br />頑張ってください!");
  }
}

export async function changeCLockTaskStatus(
  id: number | string,
  status: boolean
) {
  const { error } = await supabase
    .from("cl_tasks")
    .update({ status })
    .eq("id", id);
  if (error) {
    console.error(error);
    toastError("タスクの変更中にエラーが発生しました");
    return false;
  } else {
    toastSuccess(status ? "お疲れ様です!" : "頑張りましょう!");
    return true;
  }
}
